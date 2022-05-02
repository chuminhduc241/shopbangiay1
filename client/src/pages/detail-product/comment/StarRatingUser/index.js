import { Progress, Rate } from "antd";

import "./style.css";
export default function StarRatingUser() {
  return (
    <div className="ground-start-rating">
      <div className="main-start-rating">
        <div className="start-rating">
          <h3>Đánh Giá Trung Bình</h3>
          <p>{6}/5</p>
          <Rate value={1} disabled />
        </div>
        <div className="control-start-rating">
          <div className="items-start-rating">
            <div className="control-start">
              <p>1</p>
              <Rate value={1} disabled />
            </div>
            <Progress
              percent={((1 / 10) * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: "#f25800",
                to: "#ff7d26",
              }}
              status="active"
            />
            <p>
              <span>{1}</span> đánh giá
            </p>
          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>2</p>
              <Rate value={1} disabled />
            </div>
            <Progress
              percent={((1 / 10) * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: "#f25800",
                to: "#ff7d26",
              }}
              status="active"
            />
            <p>
              <span>{1} </span> đánh giá
            </p>
          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>3</p>
              <Rate value={1} disabled />
            </div>
            <Progress
              percent={((1 / 10) * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: "#f25800",
                to: "#ff7d26",
              }}
              status="active"
            />
            <p>
              <span>{1}</span> đánh giá
            </p>
          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>4</p>
              <Rate value={1} disabled />
            </div>
            <Progress
              percent={((1 / 10) * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: "#f25800",
                to: "#ff7d26",
              }}
              status="active"
            />
            <p>
              <span>{1}</span> đánh giá
            </p>
          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>5</p>
              <Rate value={1} disabled />
            </div>
            <Progress
              percent={((1 / 10) * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: "#f25800",
                to: "#ff7d26",
              }}
              status="active"
            />
            <p>
              <span>{1}</span> đánh giá
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
