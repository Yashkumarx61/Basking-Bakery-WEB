import { useState } from 'react';
import bakeryLogo from '../assets/basking-bakery-logo.png';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  loading = 'lazy',
  onClick,
}) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  return (
    <img
      src={hasError || !src ? fallbackSrc : src}
      alt={alt || 'Basking Bakery Product'}
      className={className}
      loading={loading}
      onError={handleError}
      onClick={onClick}
    />
  );
}
