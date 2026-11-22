export default function MenuStatus({ status, onRetry, children }) {
  if (status === 'loading') {
    return <p className="container notice" role="status">Loading the menu…</p>
  }

  if (status === 'error') {
    return (
      <div className="container notice">
        <p role="alert">The menu could not load. Please try again.</p>
        <button className="button" type="button" onClick={onRetry}>Retry</button>
      </div>
    )
  }

  return children
}
