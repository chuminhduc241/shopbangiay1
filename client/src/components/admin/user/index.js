import { Image, Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";

const User = () => {
  const [data, setData] = useState();
  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hình ảnh",
      key: "image",
      dataIndex: "image",
      width: "300px",
      render: (image) => (
        <div className="product-imgs">
          <Image src={image} alt={"img"} />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Sửa</a>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa ?"
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
  return (
    <div className="user-admin">
      <Table columns={columns} pagination={false} dataSource={data && data} />
    </div>
  );
};

export default User;
