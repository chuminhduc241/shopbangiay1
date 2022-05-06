import { Image, message, Popconfirm, Space, Table } from "antd";
import Loading from "pages/LoadingPage";
import React, { useEffect, useState } from "react";
import { UserServices } from "services/user-service";

const User = () => {
  const [data, setData] = useState();
  const [call, setCall] = useState();

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Hình ảnh",
      key: "avatar",
      dataIndex: "avatar",
      render: (image) => (
        <div className="product-imgs">
          <Image src={image} style={{ width: 70 }} alt={"img"} />
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "role",
      key: "role",
      render: (record) => {
        return <div>{record === 1 ? "Admin" : "khách hàng"}</div>;
      },
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
            onConfirm={() => confirm(record)}
          >
            <a href="#">Xóa</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const userService = new UserServices();
  const [loading, setLoading] = useState(false);
  const confirm = async (e) => {
    console.log(e);
    try {
      setCall(!call);
      message.success("Xóa thành công");
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
  useEffect(() => {
    const getAllUser = async () => {
      setLoading(true);
      const res = await userService.getAllInfor();
      console.log(res);
      setData(res);
    };
    getAllUser();
    setLoading(false);
  }, [call]);
  return (
    <div className="user-admin">
      {loading ? (
        <Loading />
      ) : (
        <Table columns={columns} dataSource={data && data} />
      )}
    </div>
  );
};

export default User;
