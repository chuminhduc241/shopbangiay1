import { useEffect, useState } from "react";
import { UserServices } from "services/user-service";
import "./style.css";

export default function Conversation({ conversation }) {
  const [user, setUser] = useState(null);
  const userService = new UserServices();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userService.getInfor({ id: conversation.id_user });
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.avatar} alt="" />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
