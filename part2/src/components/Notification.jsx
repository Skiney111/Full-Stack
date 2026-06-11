const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const baseStyle = {
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  }

  const notificationStyle = {
    ...baseStyle,
    ...(type === 'error' 
      ? {
          color: '#d32f2f',
          background: '#ffebee',
          border: '2px solid #d32f2f'
        }
      : {
          color: '#388e3c',
          background: '#e8f5e9',
          border: '2px solid #388e3c'
        }
    )
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
