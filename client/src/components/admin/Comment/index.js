import { Image, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import { ProductService } from "services/product-service";
const Comment = () => {
  const [data, setData] = useState([]);

  const producService = new ProductService();
  const [call, setCall] = useState(false);
  const getCategory = async () => {
    let res = await producService.getAllComments();
    res = res.comments.map((item) => {
      return { ...item, key: item._id };
    });
    setData(res);
  };
  console.log(data);
  const onChangeStatus = async (record) => {
    console.log(record._id);
    await producService.updateComment({ id: record._id });
  };
  useEffect(() => {
    getCategory();
  }, [call]);
  console.log(data);
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "id_product",
      key: "id_product",
      render: (name) => <div>{name?.name}</div>,
    },
    {
      title: "Hình ảnh",
      key: "image",
      dataIndex: "id_product",
      render: (image) => (
        <div className="product-imgs">
          <Image
            src={image?.images[0]?.url}
            alt={"img"}
            style={{ width: 100 }}
          />
        </div>
      ),
    },
    {
      title: "Người bình luận",
      dataIndex: "id_user",
      key: "id_user",
      render: (name) => <div className="product-imgs">{name.name}</div>,
    },
    {
      title: "Số sao",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Trạng thái",
      key: "action",
      render: (text, record) => {
        console.log(record);
        return (
          <Switch
            defaultChecked={record.status}
            onChange={() => onChangeStatus(record)}
          />
        );
      },
    },
  ];
  return (
    <div className="Comment-admin">
      <Table columns={columns} dataSource={data && data} />
    </div>
  );
};

export default Comment;
