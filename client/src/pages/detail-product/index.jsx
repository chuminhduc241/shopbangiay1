import { Breadcrumb } from "antd";
import { DataContext } from "DataProvider";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "services/product-service";
import { Link } from "react-router-dom";
import Comment from "./comment";
import InForProduct from "./InforProduct";

const DetailProduct = () => {
  const [product, setProduct] = useState();

  const { socket } = useContext(DataContext);
  const { id } = useParams();
  const productService = new ProductService();
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id);
    }
  }, [socket, id]);
  console.log(id);
  useEffect(() => {
    const getProduct = async () => {
      const res = await productService.getProductById({ id: id });
      setProduct(res.product);
    };
    getProduct();
  }, [id]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link
            style={{
              display: "inline-block",
              padding: "15px 10px",
              color: "rgb(74, 85, 104)",
              textTransform: "capitalize",
              lineHeight: "16px",
              fontWeight: 500,
            }}
            to="/"
          >
            Trang chủ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            style={{
              display: "inline-block",
              padding: "15px 10px",
              color: "rgb(74, 85, 104)",
              textTransform: "capitalize",
              lineHeight: "16px",
              fontWeight: 500,
            }}
            to={`/product-type/?catagory=${product?.category}`}
          >
            {product?.category}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item
          style={{
            display: "inline-block",
            padding: "15px 10px",
            color: "rgb(236, 24, 57)",
            textTransform: "capitalize",
            lineHeight: "16px",
            fontWeight: 500,
          }}
        >
          {product?.name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <InForProduct product={product} />
      <Comment socket={socket} product_id={id} />
    </div>
  );
};

export default DetailProduct;
