import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductService } from "services/product-service";
import FormWrite from "./FormWrite";
import ListComment from "./ListComment";
import StarRatingUser from "./StarRatingUser";
import "./style.css";
const Comment = ({ socket, product_id }) => {
  const { user } = useSelector((state) => state.auth);
  const productService = new ProductService();

  return (
    <div>
      <FormWrite user={user} socket={socket} product_id={product_id} />
      <StarRatingUser />
      <ListComment user={user} product_id={product_id} socket={socket} />
    </div>
  );
};

export default Comment;
