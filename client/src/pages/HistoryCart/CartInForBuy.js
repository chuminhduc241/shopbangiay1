import { Button, message, Modal } from "antd";
import {
  EditOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// Component
import EditAddress from "./EditAddress";
import moment from "moment";
import "moment/locale/vi";
import { useState } from "react";
import { OrderService } from "services/order-service";
moment.locale("vi");
const formatter = new Intl.NumberFormat("vn");
export default function CartInForBuy({ id_card, data, call, setCall }) {
  const [visibleEditAddress, setVisibleEditAddress] = useState(false);
  // function
  const orderService = new OrderService();
  const CancelOrder = async (id_card) => {
    const res = await orderService.updateStatus({ status: -1, id: id_card });
    setCall(!call);
    message.success("Hủy đặt hàng thành công");
  };
  const OrderCall = async (id_card) => {
    const res = await orderService.updateStatus({ status: 0, id: id_card });
    setCall(!call);
    message.success(" Đặt lại hàng thành công");
  };
  const handelDelete = async () => {
    try {
      const res = await orderService.deleteOrder({ id: id_card });
      message.success("Xóa thành công");
      setCall(!call);
    } catch (error) {
      message.error("Xoá thất bại");
    }
  };

  function deleteCart(id_card) {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa những giỏ hàng này không ?.",
      icon: <ExclamationCircleOutlined />,
      width: 500,
      okText: "tiếp tục",
      cancelText: "hủy",
      onOk: { handelDelete },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  return (
    <div className="group-info-buy-cart">
      <div className="group-sum-total " style={{ marginRight: 14 }}>
        <h5>
          Tổng Số Tiền
          <p>
            {formatter.format(data.totalSum)} <u>đ</u>
          </p>
        </h5>
        <div className="button-more-info">
          {/* <Button
            type="primary"
            className="btn-cancel-order-call"
            onClick={() => {
              deleteCart(id_card);
            }}
          >
            <DeleteOutlined /> Xóa giỏ hàng
          </Button> */}
          {data.status_order === -1 && (
            <Button
              type="primary"
              className="btn-order-call"
              onClick={() => OrderCall(id_card)}
            >
              <ShoppingCartOutlined /> Đặt hàng lại
            </Button>
          )}
          {data.status_order === 0 && (
            <Button
              type="primary"
              className="btn-cancel-order"
              onClick={() => CancelOrder(id_card)}
            >
              <CloseOutlined /> Hủy đơn hàng
            </Button>
          )}
          {data.status_order === -1 && (
            <Button disabled type="primary" className="btn-cancel-order-uy">
              <WarningOutlined /> Đơn hàng đã hủy
            </Button>
          )}
          {data.status_order === 0 && (
            <Button
              type="primary"
              className="btn-edit-address"
              onClick={() => setVisibleEditAddress(true)}
            >
              <EditOutlined />
              Chỉnh sửa
            </Button>
          )}
          {data.status_order !== -1 && data.status_order !== 2 && (
            <Button
              disabled={true}
              className={`${data.success ? "true" : "false"}`}
            >
              {data.status_order === 1 && <CheckCircleOutlined />}
              {data.status_order === 0 && <LoadingOutlined />}
              Trạng Thái:
              {data.status_order === 0 && " Chờ duyệt"}
              {data.status_order === 1 && " Đang giao"}
            </Button>
          )}
          {data.status_order === 2 && (
            <Button disabled={true} style={{ backgroundColor: "green" }}>
              <CheckCircleOutlined /> Trạng Thái: Hoàn thành
            </Button>
          )}
          {data.message && <p className="message">{data.message}</p>}
        </div>
        <div className="ground-address-cart">
          <div className="group-address-modal">
            <span>Địa Chỉ:</span> <p>{data.address}</p>
          </div>
          <div className="group-phone-modal">
            <span>Số Điện Thoại:</span> <p>{data.phone}</p>
          </div>
          <div className="group-payment-modal">
            <span>Thanh Toán:</span> <p>{data.payment}</p>
          </div>
          {data.note && (
            <div className="group-address-modal">
              <span>Ghi chú:</span> <p>{data.note}</p>
            </div>
          )}
          <div className="group-time-modal">
            <span>Ngày Đặt Hàng:</span>
            <p>
              {`${moment(data.createAt).fromNow()}, ${moment(
                data.createAt
              ).format("LLLL")}`}
            </p>
          </div>
        </div>
      </div>
      <Modal
        title="Chỉnh sửa giao hàng"
        onClose={() => setVisibleEditAddress(false)}
        visible={visibleEditAddress}
        centered
        onCancel={() => setVisibleEditAddress(false)}
        footer={null}
      >
        <EditAddress
          id_card={id_card}
          call={call}
          setCall={setCall}
          setVisibleEditAddress={setVisibleEditAddress}
        />
      </Modal>
    </div>
  );
}
