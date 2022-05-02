import { Button } from "antd";
import { DataContext } from "DataProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ConversationService } from "services/conversation-service";
import { MessagesService } from "services/message-Service";
import "./Chat.scss";
import Message from "./message";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [conversations, setConversations] = useState();
  const { user } = useSelector((state) => state.auth);
  const { socket } = useContext(DataContext);
  console.log(socket);
  const scrollRef = useRef();
  const conversationService = new ConversationService();
  const messagesService = new MessagesService();
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    return () => socket?.off("getMessage");
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket?.emit("addUser", user?._id);
  }, [socket, user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await conversationService.getConversationbyID({
          id: user?._id,
        });
        console.log(res);
        setConversations(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);
  console.log(conversations);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await messagesService.getMessages({
          id: conversations?._id,
        });
        setMessages(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [conversations]);
  console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: conversations._id,
    };
    console.log(user);
    socket?.emit("sendMessage", {
      senderId: user?._id,
      receiverId: "admin",
      text: newMessage,
    });

    try {
      console.log(message);
      const res = await messagesService.newMessage(message);
      setMessages([...messages, res]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      <div class="Chatbox">
        <div className="chatbox-title">
          <div>Hỗ trợ</div>
        </div>

        {
          <>
            <div className="chattop">
              {messages?.map((m) => (
                <div ref={scrollRef}>
                  <Message
                    message={m}
                    own={m.sender === user?._id}
                    user={user}
                  />
                </div>
              ))}
            </div>
            <div className="chatBox2">
              <textarea
                className="text"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <Button type="primary" className="" onClick={handleSubmit}>
                Gửi
              </Button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Chat;
