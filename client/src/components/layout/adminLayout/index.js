import React, { useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
const LayoutAdmin = ({ children }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector("nav");
    const toggle = body.querySelector(".toggle");
    const searchBtn = body.querySelector(".search-box");

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    searchBtn.addEventListener("click", () => {
      sidebar.classList.remove("close");
    });
  }, []);

  return (
    <div>
      <nav class="sidebar1 close">
        <header>
          <div class="image-text">
            <span class="image">
              {/* <!--<img src="logo.png" alt="">--> */}
            </span>

            <div class="text logo-text">
              <span class="name">Codinglab</span>
              <span class="profession">Web developer</span>
            </div>
          </div>

          <i class="bx bx-chevron-right toggle"></i>
        </header>

        <div class="menu-bar2">
          <div class="menu">
            <li class="search-box">
              <i class="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>

            <ul class="menu-links">
              <li class="nav-link">
                <Link href="#">
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
                <Link href="#">
                  <i class="bx bx-bell icon"></i>
                  <span class="text nav-text">Thương hiệu</span>
                </Link>
              </li>

              <li class="nav-link">
                <Link href="#">
                  <i class="bx bx-pie-chart-alt icon"></i>
                  <span class="text nav-text">Tài khoản</span>
                </Link>
              </li>

              <li class="nav-link">
                <Link href="#">
                  <i class="bx bx-heart icon"></i>
                  <span class="text nav-text">Tin tức</span>
                </Link>
              </li>

              <li class="nav-link">
                <Link href="#">
                  <i class="bx bx-wallet icon"></i>
                  <span class="text nav-text">Wallets</span>
                </Link>
              </li>
            </ul>
          </div>

          <div class="bottom-content">
            <li class="">
              <Link href="#">
                <i class="bx bx-log-out icon"></i>
                <span class="text nav-text">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <section class="home3">
        <div class="text">{children}</div>
      </section>
    </div>
  );
};

export default LayoutAdmin;
