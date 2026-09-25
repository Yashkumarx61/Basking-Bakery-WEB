import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function realtimeInventoryPlugin() {
  const storePath = path.resolve(process.cwd(), 'inventory-store.json');
  let sseClients = [];

  // Auto-seed inventory-store.json from data.js if missing
  const ensureStoreExists = () => {
    if (!fs.existsSync(storePath)) {
      try {
        const dataPath = path.resolve(process.cwd(), 'src/data.js');
        if (fs.existsSync(dataPath)) {
          const content = fs.readFileSync(dataPath, 'utf-8');
          const match = content.match(/export const products = (\[[\s\S]*?\]);/);
          if (match && match[1]) {
            const initial = new Function(`return ${match[1]}`)();
            fs.writeFileSync(storePath, JSON.stringify(initial, null, 2), 'utf-8');
            return initial;
          }
        }
      } catch (e) {
        console.error('Could not auto-seed inventory-store.json:', e);
      }
    }
  };

  ensureStoreExists();

  // Heartbeat ping interval to prevent mobile browser SSE disconnects
  setInterval(() => {
    sseClients.forEach((res) => {
      try {
        res.write(': ping\n\n');
      } catch (e) {}
    });
  }, 15000);

  const getStoredInventory = () => {
    try {
      if (fs.existsSync(storePath)) {
        const raw = fs.readFileSync(storePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading inventory store:', e);
    }
    return null;
  };

  const saveStoredInventory = (data) => {
    try {
      fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing inventory store:', e);
    }
  };

  const broadcastToClients = (data) => {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    sseClients.forEach((res) => {
      try {
        res.write(payload);
      } catch (err) {}
    });
  };

  const handleMiddleware = (req, res, next) => {
    const url = req.url?.split('?')[0];

    // Enable CORS for cross-device requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    // 1. GET /api/inventory/stream (Server-Sent Events stream for real-time cross-device sync)
    if (url === '/api/inventory/stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
      });

      const current = getStoredInventory();
      if (current) {
        res.write(`data: ${JSON.stringify(current)}\n\n`);
      }

      sseClients.push(res);

      req.on('close', () => {
        sseClients = sseClients.filter((client) => client !== res);
      });
      return;
    }

    // 2. GET /api/inventory
    if (url === '/api/inventory' && req.method === 'GET') {
      const data = getStoredInventory();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data || []));
      return;
    }

    // 3. POST /api/inventory
    if (url === '/api/inventory' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const newProducts = JSON.parse(body);
          if (Array.isArray(newProducts)) {
            saveStoredInventory(newProducts);
            broadcastToClients(newProducts);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: newProducts.length }));
            return;
          }
        } catch (err) {
          console.error('Error parsing POST inventory payload:', err);
        }
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid inventory payload' }));
      });
      return;
    }

    next();
  };

  return {
    name: 'realtime-inventory-sync',
    configureServer(server) {
      server.middlewares.use(handleMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleMiddleware);
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [realtimeInventoryPlugin()],
  server: {
    host: true, // Exposes dev server on local network (0.0.0.0) for Android/iOS phones
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
});
