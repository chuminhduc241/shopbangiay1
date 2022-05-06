import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryService } from "services/category-service";
// API
// component
import "./style.scss";
export default function Menu({ openMenu, setOpenMenu }) {
  const onClickCloseMenu = () => {
    setOpenMenu(false);
  };
  {
    openMenu
      ? document.querySelector("body").classList.add("active")
      : document.querySelector("body").classList.remove("active");
  }
  const [category, setCategory] = useState([]);
  const categoryServier = new CategoryService();
  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryServier.getCategory();
      setCategory(res);
    };
    getCategory();
  }, []);
  return (
    <>
      <div className={`ground-menu ${openMenu && "open"}`}>
        <nav>
          <ul className="menu">
            <li style={{ "--i": "1" }}>
              <Link to="/" className="active" onClick={onClickCloseMenu}>
                trang chủ
              </Link>
            </li>
            {category.length !== 0
              ? category.map((item) => (
                  <li
                    key={item._id}
                    className="active-menu"
                    style={{ "--i": "2" }}
                  >
                    <Link to={`/product-type/?category=${item.name}`}>
                      <div className="icon-menu">
                        <img src={item.image} alt="logoAdidas" />
                      </div>
                      {item.name}
                      <i className="fa fa-caret-down" />
                    </Link>
                  </li>
                ))
              : ""}
          </ul>
        </nav>
      </div>
      {openMenu && <div className="active-before" onClick={onClickCloseMenu} />}
    </>
  );
}
