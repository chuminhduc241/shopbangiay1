import "./style.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className={own? "noneImg": "messageImg"} src="https://joeschmoe.io/api/v1/random" alt="img" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{message.createdAt}</div>
    </div>
  );
}
