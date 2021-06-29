export default function Message({ child, text, isError }) {
  if (child) {
    return <div className="container">{child}</div>
  }
  if (text) {
    return (
      <div className={`message ${isError && "is-danger"}`}>
        <div className="message-body">{text}</div>
      </div>
    )
  }
  return <></>
}
