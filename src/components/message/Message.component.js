const Message = ({message, owner}) => {
  return (
      <div className={`chat__message ${owner && 'chat__message-own'}`}>
          {message}
      </div>
  )
}
export default Message;