const Comments = require("../models/Comment");
const Product = require("../models/Product");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const commentCtrl = {
  getComments: async (req, res) => {
    try {
      const features = new APIfeatures(
        Comments.find({ id_product: req.params.id })
          .populate("id_user")
          .populate("reply.id_user"),
        req.query
      )
        .sorting()
        .paginating();

      const comments = await features.query;

      res.json({
        status: "success",
        result: comments.length,
        comments,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getStarComment: async (req, res) => {
    const oneStarsResult = await Comments.find({
      id_product: req.params.id,
      rating: 1,
    });
    const twoStarsResult = await Comments.find({
      id_product: req.params.id,
      rating: 2,
    });
    const threeStarsResult = await Comments.find({
      id_product: req.params.id,
      rating: 3,
    });
    const fourStarsResult = await Comments.find({
      id_product: req.params.id,
      rating: 4,
    });
    const fiveStarsResult = await Comments.find({
      id_product: req.params.id,
      rating: 5,
    });
    const sumStarRating =
      oneStarsResult.length +
      twoStarsResult.length +
      threeStarsResult.length +
      fourStarsResult.length +
      fiveStarsResult.length;
    const tba = await Product.findOne({
      _id: req.params.id,
    });

    const m = Math.ceil(tba.ratings / tba.numOfReviews);

    const starRating = {
      oneStars: oneStarsResult.length,
      twoStars: twoStarsResult.length,
      threeStars: threeStarsResult.length,
      fourStars: fourStarsResult.length,
      fiveStart: fiveStarsResult.length,
      tb: m,
      sum: sumStarRating,
    };
    res.status(200).json({ msg: starRating });
  },
};

module.exports = commentCtrl;
