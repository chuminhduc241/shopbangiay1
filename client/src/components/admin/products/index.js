import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Pagination,
  Button,
  Popconfirm,
  message,
  Image,
} from "antd";
import "./style.scss";
import { ProductService } from "services/product-service";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
const Products = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState();
  const [edit, setEdit] = useState(false);
  const [call, setCall] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const productService = new ProductService();
  const formatter = new Intl.NumberFormat("vn");
  const getProduct = async () => {
    const res = await productService.getProductAdmin({ page, limit });
    setData(res);
  };
  useEffect(() => {
    getProduct();
  }, [limit, page, call]);
  const handleEdit = (product) => {
    setProduct(product);
    setEdit(true);
  };

  const confirm = async (e) => {
    console.log(e);
    try {
      const res = await productService.deleteProduct({ id: e._id });
      setCall(!call);
      message.success("Xóa thành công");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };

  const columns = [
    {
      title: "Tên Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <div>{formatter.format(price)} đ</div>,
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      key: "size",
      render: (size) => size.map((s) => <span>{s} </span>),
    },
    {
      title: "Màu sắc",
      key: "color",
      dataIndex: "color",
      render: (color) => (
        <>
          {color.map((c) => (
            <Tag color={"green"}>{c.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Thương hiệu",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Hình ảnh",
      key: "images",
      dataIndex: "images",
      width: "300px",
      render: (images) => (
        <div className="product-imgs">
          {images.map((c) => (
            <Image src={c.url} alt={c.public_id} />
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Sửa</a>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa ?"
            onConfirm={() => confirm(record)}
            okText="Xóa"
            cancelText="Hủy"
            placement="topRight"
          >
            <a href="#">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const totalPage = useMemo(() => {
    return Math.ceil(data?.count / data?.products?.length);
  }, [data]);
  console.log(data);
  const handlePagination = (value) => {
    setPage(value);
  };
  return (
    <div className="Product-admin">
      <Button
        type="primary"
        className="addproduct"
        size="large"
        onClick={() => setIsNewProduct(true)}
      >
        <i class="fa-solid fa-plus" style={{ marginRight: "10px" }}></i>
        Thêm sản phẩm
      </Button>
      <Table columns={columns} pagination={false} dataSource={data?.products} />
      <div className="phantrang">
        <Pagination
          defaultCurrent={page}
          onChange={handlePagination}
          total={totalPage * 10}
        />
      </div>
      {isNewProduct && (
        <NewProduct
          isNewProduct={isNewProduct}
          setIsNewProduct={setIsNewProduct}
        />
      )}
      {edit && (
        <EditProduct
          edit={edit}
          call={call}
          setCall={setCall}
          setEdit={setEdit}
          product={product}
        />
      )}
    </div>
  );
};

export default Products;
