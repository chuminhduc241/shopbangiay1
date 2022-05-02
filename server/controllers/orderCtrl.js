const Orders = require("../models/Order");
const orderCtrl = {
  //   getCategories: async (req, res) => {
  //     try {
  //       const categories = await Category.find();
  //       res.json(categories);
  //     } catch (err) {
  //       return res.status(500).json({ msg: err.message });
  //     }
  //   },
  getAllOrder: async (req, res) => {
    try {
      const oders = await Orders.find().populate("id_user");
      return res.status(200).json(oders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllOrderbyId: async (req, res) => {
    try {
      const oders = await Orders.find({ id_user: req.params.id });

      return res.status(200).json(oders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const {
        id_user,
        status_order,
        address,
        phone,
        totalSum,
        cart,
        payment,
        note,
      } = req.body;

      const neworder = new Orders({
        id_user,
        address,
        phone,
        totalSum,
        cart,
        payment,
        note,
        status_order,
      });

      await neworder.save();
      res.json({ msg: "Tạo thành công đơn hàng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateAdress: async (req, res) => {
    try {
      const { id, address, phone } = req.body;
      await Orders.findOneAndUpdate({ _id: id }, { address, phone });

      return res.status(200).json({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id, status } = req.body;
      await Orders.findOneAndUpdate({ _id: id }, { status_order: status });

      return res.status(200).json({ msg: "Cập nhập thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateMessage: async (req, res) => {
    try {
      const { id, message } = req.body;
      await Orders.findOneAndUpdate({ _id: id }, { message: message });

      return res.status(200).json({ msg: "Cập nhập thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Orders.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = orderCtrl;
