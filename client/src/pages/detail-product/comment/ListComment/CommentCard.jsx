import { Rate, Tooltip } from "antd";
import React from "react";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
const CommentCard = ({ comment, children }) => {
  const avatarLogo =
    "https://res.cloudinary.com/phuockaito/image/upload/v1618158354/tich-xanh-fanpage-va-quang-cao-livestream-fanpage-tich-xanh_ttn2e7.png";
  return (
    <div>
      <div className="item-comment">
        <div className="avatar-author">
          <img src={comment?.id_user.avatar} alt="" />
        </div>
        <div className="content-author">
          <div className="ground-content-name-start">
            <div className="main-item-comment">
              <div className="group-avatar-logo-name">
                <h3 className={comment?.role === 1 && "admin"}>
                  {comment?.id_user?.name}
                  {comment?.id_user?.role === 1 && (
                    <img src={avatarLogo} alt={comment?.name} />
                  )}
                </h3>
                {comment?.id_user?.role === 1 && <p>Quản trị viên</p>}
              </div>
              <div className="time-content">
                <Tooltip
                  placement="topLeft"
                  title={moment(comment?.createAt).format("LLLL")}
                >
                  <span>{moment(comment?.createAt).fromNow()}</span>
                </Tooltip>
                {comment?.editComment && (
                  <span className="edit">(đã chỉnh sửa)</span>
                )}
              </div>

              <div className="group-start">
                {comment?.rating > 0 && (
                  <Rate disabled value={comment?.rating} />
                )}
              </div>
              <div className="ground-content">
                <p> {comment?.content}</p>
              </div>
              <div className="ground-reply">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
