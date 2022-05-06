import { MessageOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Chat from "./Chat";
import "./style.scss";
const Chatbox = () => {
  const [tonggle, setTonggle] = useState(false);
  return (
    <div>
      <div className="Chatbox-container">
        {!tonggle && (
          <div className="float" onClick={() => setTonggle(true)}>
            <MessageOutlined style={{ fontSize: 24 }} />
          </div>
        )}
        {tonggle && <Chat setTonggle={setTonggle} />}
      </div>
    </div>
  );
};

export default Chatbox;
