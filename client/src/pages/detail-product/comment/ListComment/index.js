import { Spin } from "antd";
import Loading from "pages/LoadingPage";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ProductService } from "services/product-service";
import CommentItem from "./CommentItem";
import "./style.scss";
export default function ListComment({ socket, user, product_id }) {
  const [idComment, setIdComment] = useState("");
  const [replyComment, setReplyComment] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [page, setPage] = useState(1);
  const [dataComment, setDataComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const productService = new ProductService();
  const pageEnd = useRef();
  const createdAt = new Date().toISOString();
  const [contentReply, setContenReply] = useState("");

  useEffect(() => {
    setLoading(true);
    const getcomment = async () => {
      const res = await productService.getComments({
        product_id,
        page,
        limit: 3,
      });
      setDataComment(res.comments);
      console.log(res);
      console.log(res.comments);
      setLoading(false);
    };
    getcomment();
  }, [product_id, page]);
  useEffect(() => {
    if (socket) {
      console.log("nghe");
      socket.on("sendCommentToClient", (msg) => {
        setDataComment([msg, ...dataComment]);
      });
      console.log("vao");
      return () => socket.off("sendCommentToClient");
    }
  }, [socket, dataComment, setDataComment]);
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyCommentToClient", (msg) => {
        const newArr = [...dataComment];

        newArr.forEach((cm) => {
          if (cm._id === msg._id) {
            cm.reply = msg.reply;
          }
        });

        setDataComment(newArr);
      });

      return () => socket.off("sendReplyCommentToClient");
    }
  }, [socket, dataComment]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((pre) => pre + 1);
        }
      },
      {
        threshold: 1,
      }
    );
    observer.observe(pageEnd.current);
  }, []);
  return (
    <div className="list-item-comment">
      <p
        style={{
          color: "#4a5568",
          fontSize: "1.2rem",
          fontWeight: 550,
          margin: 0,
          paddingLeft: "10px",
        }}
      >
        Khách hàng nhận xét
      </p>
      {dataComment?.map((item) => (
        <CommentItem
          key={item._id}
          comment={item}
          user={user}
          socket={socket}
          product_id={product_id}
        />
      ))}
      {loading && <Spin />}
      <button style={{ opacity: 0 }} ref={pageEnd}>
        load more
      </button>
    </div>
  );
}
