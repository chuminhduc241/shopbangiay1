import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.scss";
import { ProductService } from "services/product-service";
import { Pagination, Rate } from "antd";
import Loading from "pages/LoadingPage";
import { useLocation } from "react-router-dom";
import useCustomRouter from "hooks/useCustomRouter";
import Sorting from "./sorting";
import { set } from "lodash";
import ReactPaginate from "react-paginate";
function ProductsType() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [sort, setSort] = useState("-createdAt");
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const [data, setData] = useState([]);
  const { pushQuery } = useCustomRouter();
  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.count / limit);
  }, [data, limit]);
  console.log(totalPages);
  const localtion = useLocation();
  const productService = new ProductService();

  const getProductByID = async (page, limit, sort, category) => {
    const res = await productService.getProductByCategory({
      page,
      limit,
      sort,
      category,
    });
    console.log(res);
    setData(res);
  };
  console.log(data);
  useEffect(() => {
    setLoading(true);
    const page = new URLSearchParams(search).get("page") || 1;
    setPage(page);
    const sort = new URLSearchParams(search).get("sort") || "-createdAt";
    setSort(sort);
    const category = new URLSearchParams(search).get("category") || "Adidas";
    setCategory(category);
    getProductByID(page, limit, sort, category);
    setLoading(false);
  }, [search]);
  const formatter = new Intl.NumberFormat("vn");
  const showReview = (rating, numReviews) => {
    const rate = rating / numReviews;
    if (numReviews > 0) {
      return (
        <>
          <Rate value={rate} readOnly />
          <p>{numReviews} Đánh giá</p>
        </>
      );
    } else {
      return (
        <>
          <Rate value={5} readOnly />
          <p> Chưa có đánh giá</p>
        </>
      );
    }
  };
  const ShowProducts = (data) => {
    return (
      <div className="products-type">
        {data?.products?.map((product) => (
          <div
            className="item-products-type"
            key={product._id}
            data-aos="zoom-in"
          >
            <Link to={`/detail/${product._id}`}>
              <div className="ig-products-type">
                <LazyLoadImage
                  effect="blur"
                  src={product?.images[0]?.url}
                  alt={product?._id}
                  key={product?._id}
                  height="100%"
                  width="100%"
                />{" "}
              </div>
              <div className="name-products-type">
                <p>{product?.name}</p>
              </div>
            </Link>
            <div className="price-products-type">
              <div className="group-price">
                <span>
                  {formatter.format(product?.price)} <u>đ</u>{" "}
                </span>
              </div>
            </div>
            <div className="group-start-review">
              {showReview(product.rating, product.numOfReviews)}
            </div>
          </div>
        ))}
      </div>
    );
  };
  const handleChangePage = (page) => {
    pushQuery({ page: page, sort, category });
  };
  return (
    <>
      <div className="group-products-type">
        <div className="group-products-header">
          <div className="category1">{category}</div>
          <div className="filter-price">
            <Sorting
              sort={sort}
              category={category}
              calback={(sort, category) =>
                pushQuery({ page, sort, limit, category })
              }
            />
          </div>
        </div>
        {loading && <Loading />}
        {!loading && ShowProducts(data)}
        <Pagination
          Current={page}
          onChange={handleChangePage}
          total={totalPages * 10}
        />
      </div>
    </>
  );
}
export default ProductsType;
