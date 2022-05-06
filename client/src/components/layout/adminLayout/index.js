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
      <nav class="sidebar1 close">
        <header style={{ backgroundColor: "#7571f9", height: 70 }}>
          <div class="image-text">
            <span class="image">
              {/* <!--<img src="logo.png" alt="">--> */}
            </span>

            <div class="text logo-text">
              <span class="name">Codinglab</span>
              <span class="profession">Web developer</span>
            </div>
          </div>
        </header>
        <div class="menu-bar2">
          <div class="menu">
            <ul class="menu-links">
              <li class="nav-link">
                <Link to="/">
                  <i class="bx bx-home-alt icon"></i>
                  <span class="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li class="nav-link">
                <Link to="/admin/product">
                  <i class="bx bx-bar-chart-alt-2 icon"></i>
                  <span class="text nav-text">Sản phẩm</span>
                </Link>
              </li>

              <li class="nav-link">
                <Link to="/admin/category">
                  <i class="bx bx-bell icon"></i>
                  <span class="text nav-text">Thương hiệu</span>
                </Link>
              </li>

              <li class="nav-link">
                <Link to="/admin/user">
                  <i class="bx bx-pie-chart-alt icon"></i>
                  <span class="text nav-text">Quản lý tài khoản</span>
                </Link>
              </li>
              <li class="nav-link">
                <Link to="/admin/order">
                  <i class="bx bx-pie-chart-alt icon"></i>
                  <span class="text nav-text">Quản lý đơn hàng</span>
                </Link>
              </li>
              <li class="nav-link">
                <Link to="/admin/user">
                  <i class="bx bx-pie-chart-alt icon"></i>
                  <span class="text nav-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section class="home3">
        <div className="hom3-header">
          <i class="fa-solid fa-bars toggle"></i>
          <Avatar src="https://joeschmoe.io/api/v1/random" size={40} />
        </div>
        <div class="text">{children}</div>
      </section>
    </div>
  );
};

export default LayoutAdmin;
