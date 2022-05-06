const Orders = require("../models/Order");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 1000000;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const orderCtrl = {
  getAllOrder: async (req, res) => {
    try {
      const features = new APIfeatures(
        Orders.find().populate("id_user"),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();
      const oders = await features.query;
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
