import "./style.css";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "./message";
import Conversation from "./conversations";
import { useSelector } from "react-redux";
import { DataContext } from "DataProvider";
import { ConversationService } from "services/conversation-service";
import { MessagesService } from "services/message-Service";
import { io } from "socket.io-client";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { socket } = useContext(DataContext);
  console.log(socket);
  const scrollRef = useRef();
  const conversationService = new ConversationService();
  const messagesService = new MessagesService();
  useEffect(() => {
    socket.on("toAdmin", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    return () => socket?.off("toAdmin");
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.emit("addUser", user._id);
  }, [socket, user]);
  console.log(conversations);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await conversationService.getAllConversation();
        setConversations(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await messagesService.getMessages({ id: currentChat?._id });
        setMessages(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: "admin",
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.id_user;

    socket?.emit("sendMessage", {
      senderId: "admin",
      receiverId: receiverId,
      text: newMessage,
    });

    try {
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
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === "admin"} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
