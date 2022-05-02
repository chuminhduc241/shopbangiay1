import "./style.css";
import moment from "moment";
import "moment/locale/vi";
import avatar1 from "assets/images/avatar.png";
import User from "components/layout/header/inforUser/User";
moment.locale("vi");
export default function Message({ message, own, user }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? user.avatar : avatar1}
          alt="img"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {moment(message.createdAt).format("LT")}
      </div>
    </div>
  );
}
