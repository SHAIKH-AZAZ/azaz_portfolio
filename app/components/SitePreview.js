'use client';

import { useState } from 'react';

export default function SitePreview({ url, alt, fallbackSrc }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

  return (
    <div className="site-preview-wrapper">
      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="site-preview-skeleton" aria-hidden="true">
          <div className="skeleton-bar skeleton-bar-wide" />
          <div className="skeleton-row">
            <div className="skeleton-bar" />
            <div className="skeleton-bar" />
          </div>
          <div className="skeleton-bar skeleton-bar-short" />
        </div>
      )}

      {/* Iframe — hidden until loaded, shown on success */}
      {status !== 'error' && (
        <iframe
          src={url}
          title={alt}
          className="site-preview-iframe"
          style={{ opacity: status === 'loaded' ? 1 : 0 }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      {/* Fallback image if iframe blocked */}
      {status === 'error' && fallbackSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackSrc}
          alt={alt}
          className="project-snapshot"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Clickable overlay so the card link still works */}
      <div className="site-preview-overlay" aria-hidden="true" />
    </div>
  );
}
