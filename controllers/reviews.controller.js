const Review = require("../models/Review.model");
const User = require("../models/User.model");
module.exports.reviewController = {
  postReview: async (req, res) => {
    try {
      const { text, stars } = req.body;
      const user = await User.findById(req.params.user);
      if (stars > 5) {
        return res.json("Нельзя ставить оцеку больше 5");
      }
      if (stars < 1) {
        return res.json("Нельзя поставить оцеку меньше 1");
      }
      if (user.isBlocked) {
        return res.json(
          "Заблокированный пользователь не может публиковать отзывы"
        );
      }
      await Review.create({ book: req.params.book, user, text, stars });
      res.json("Отзыв опубликован");
    } catch (err) {
      res.json({ err: "Произошла ошибка при публикации отзыва" });
    }
  },
  deleteReview: async (req, res) => {
    try {
      await Review.findByIdAndDelete(req.params.id);
      res.json("Отзыв удален");
    } catch (err) {
      res.json({ err: "Произошла ошибка при удалении отзыва" });
    }
  },
  patchReview: async (req, res) => {
    try {
      const { text, stars } = req.body;
      if (stars > 5) {
        return res.json("Нельзя ставить оцеку больше 5");
      }
      if (stars < 1) {
        return res.json("Нельзя поставить оцеку меньше 1");
      }
      await Review.findByIdAndUpdate(req.params.id, { text, stars });
      res.json("Жанр обновлен");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении отзыва" });
    }
  },
  getReviewById: async (req, res) => {
    try {
      const data = await Review.findById(req.params.id).populate(
        "book user",
        "title name"
      );
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации отзыва" });
    }
  },
  getBookReviews: async (req, res) => {
    try {
      const data = await Review.find({ book: req.params.id }).populate(
        "book user",
        "title name"
      );
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации об отзывах" });
    }
  },
  getUserReviews: async (req, res) => {
    try {
      const data = await Review.find({ user: req.params.id }).populate(
        "book user",
        "title name"
      );
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации об отзывах" });
    }
  },
  getAllReviews: async (req, res) => {
    try {
      const data = await Review.find().populate("book user", "title name");
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации об отзывах" });
    }
  },
};
