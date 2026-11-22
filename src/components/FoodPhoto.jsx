import { useState } from 'react'

function ImageWithFallback({ src, alt, loading }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <div className="photo-fallback">Photo unavailable</div>
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
    />
  )
}

export default function FoodPhoto({ src, alt, className = '', loading = 'lazy' }) {
  return (
    <div className={`food-photo ${className}`}>
      <ImageWithFallback key={src} src={src} alt={alt} loading={loading} />
    </div>
  )
}
