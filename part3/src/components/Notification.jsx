// ========= EXERCISE 3.9: NOTIFICATION COMPONENT =========
// Component for displaying notifications (success/error messages)

function Notification({ notification }) {
  if (!notification) {
    return null
  }

  const className = notification.type === 'error' ? 'error' : 'success'
  
  return (
    <div className={className}>
      {notification.message}
    </div>
  )
}

export default Notification
