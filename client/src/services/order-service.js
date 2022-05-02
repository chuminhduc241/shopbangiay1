import { ServiceBase } from "config/service-base";

export class OrderService extends ServiceBase {
  updateAddress = async (params) => {
    const { id, address, phone } = params;
    return await this.put("/order/editAderess", {
      id,
      address,
      phone,
    });
  };
  deleteOrder = async (params) => {
    const { id } = params;
    return await this.delete(`/order/${id}`);
  };
  getAllOrder = async (params) => {
    return await this.get(`/getAllOrder`);
  };
  getOrderbyUser = async (params) => {
    const { id } = params;
    return await this.get(`/order/${id}`);
  };
  updateStatus = async (params) => {
    const { id, status } = params;
    return await this.put(`/order/updateStatus`, {
      id,
      status,
    });
  };
  updateMessage = async (params) => {
    const { id, message } = params;
    return await this.put(`/order/updateMessage`, {
      id,
      message,
    });
  };
  createOrder = async (params) => {
    const {
      id_user,
      status_order,
      address,
      phone,
      totalSum,
      cart,
      payment,
      note,
    } = params;
    return await this.post("/order", {
      id_user,
      address,
      phone,
      totalSum,
      cart,
      payment,
      note,
      status_order,
    });
  };
}
