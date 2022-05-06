import { Avatar } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
const LayoutAdmin = ({ children }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector("nav");
    const toggle = body.querySelector(".toggle");

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }, []);

  return (
    <div>
      <nav className="sidebar1 close">
        <header style={{ backgroundColor: "#7571f9", height: 70 }}>
          <div className="image-text">
            <span className="image">
              {/* <!--<img src="logo.png" alt="">--> */}
            </span>

            <div className="text logo-text">
              <span className="name">Codinglab</span>
              <span className="profession">Web developer</span>
            </div>
          </div>
        </header>
        <div className="menu-bar2">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <Link to="/">
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/admin/product">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Sản phẩm</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/admin/category">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Thương hiệu</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/admin/user">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Quản lý tài khoản</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/order">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Quản lý đơn hàng</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/admin/user">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="home3">
        <div className="hom3-header">
          <i className="fa-solid fa-bars toggle"></i>
          <Avatar src="https://joeschmoe.io/api/v1/random" size={40} />
        </div>
        <div className="text">{children}</div>
      </section>
    </div>
  );
};

export default LayoutAdmin;
