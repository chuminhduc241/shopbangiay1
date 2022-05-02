import React, { useEffect, useRef, useState } from "react";
import InforUser from "./inforUser";
import { Link } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { AlignLeftOutlined, UserOutlined } from "@ant-design/icons";
import Search from "./search/Search";
import Cart from "./cart/Cart";
import { Button } from "antd";
import User from "./inforUser/User";
const Header = ({ setOpenMenu }) => {
  const user = useSelector((state) => state.auth);
  const { isLogged } = user;
  const [openUser, setOpenUser] = useState(false);
  return (
    <>
      <div className="ground-header">
        <div className="main-header">
          <div className="main-item-logo">
            <Link to="/">
              {/* <img src="" alt="This logo" /> */}
              <div className="logo2">
                MĐ <span>Shop</span>
              </div>
            </Link>
          </div>
          <Search />
          <div className="toggle-menu">
            <AlignLeftOutlined
              onClick={() => setOpenMenu(true)}
              style={{
                fontSize: "1.2em",
                color: "white",
              }}
            />
          </div>
          <Cart />
          <User />
        </div>
      </div>
    </>
  );
};

export default Header;
