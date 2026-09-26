// Shared message for loading, error, and empty states on any page.
function StatusMessage({ title, children }) {
  return (
    <div className="status" role="status">
      <h1 className="status__title">{title}</h1>
      {children && <p>{children}</p>}
    </div>
  )
}

export default StatusMessage
