const User = require("../models/User.model");
const Book = require("../models/Book.model");
module.exports.userController = {
  postUser: async (req, res) => {
    try {
      const { name, secondName, isBlocked } = req.body;
      await User.create({ name, secondName, isBlocked });
      res.json("Пользователь создан");
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("Пользователь удален");
    } catch (err) {
      res.json({ err: "Произошла ошибка при удалении пользователя" });
    }
  },
  patchUser: async (req, res) => {
    try {
      const { name, secondName } = req.body;
      await User.findByIdAndUpdate(req.params.id, { name, secondName });
      res.json("Информация пользователя обновлена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении данных пользователя" });
    }
  },
  patchRentedBooks: async (req, res) => {
    try {
      const userId = await User.findById(req.params.user);
      const bookId = await Book.findById(req.params.book);
      if (userId.isBlocked) {
        return res.json("Пользователь заблокирован");
      }
      if (userId.rentedBooks.length >= 3) {
        return res.json("Нельзя арендовать больше 3-х книг");
      }
      if (bookId.isRented) {
        return res.json("Эта книга уже арендована");
      }
      await User.findByIdAndUpdate(userId, {
        $addToSet: { rentedBooks: bookId },
      });
      await Book.findByIdAndUpdate(bookId, { isRented: true, renter: userId });
      res.json("Книга арендована");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении данных пользователя" });
    }
  },
  patchUnrentedBooks: async (req, res) => {
    try {
      const userId = await User.findById(req.params.user);
      const bookId = await Book.findById(req.params.book);
      if(userId._id.toString() !== bookId.renter._id.toString()) {
        return res.json('У этого пользователя нет данной книги')
      }
      if (userId.isBlocked) {
        return res.json("Пользователь заблокирован");
      }
      if (!bookId.isRented) {
        return res.json("Эта книга уже снята с аренды");
      }
      await User.findOneAndUpdate(userId, {
        $pull: { rentedBooks: req.params.book },
      });
      await Book.findByIdAndUpdate(bookId, { isRented: false, renter: null });
      res.json("Книга снята с аренды");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении данных пользователя" });
    }
  },
  patchUserBlock: async (req, res) => {
    try {
      const user = await User.findById(req.params.user);
      const book = await Book.findById(req.params.book);
      if (!book.isRented) {
        return res.json("Книга уже изъята у пользователя");
      }
      await User.findByIdAndUpdate(user, {
        $pull: { rentedBooks: req.params.book },
        isBlocked: true,
      });
      await Book.findByIdAndUpdate(book, { isRented: false, renter: null });
      res.json("Книга изъята у пользователя с его последующей блокировкой");
    } catch (err) {
      res.json("Произошла ошибка при обновлении данных пользователя");
    }
  },
  patchUnblockUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user.isBlocked) {
        return res.json("Пользователь уже разблокирован");
      }
      await User.findByIdAndUpdate(user, { isBlocked: false });
      res.json("Пользователь разблокирован");
    } catch (err) {
      res.json("Произошла ошибка при обновлении данных пользователя");
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = await User.find();
      res.json(data);
    } catch (err) {
      res.json({
        err: "Произошла ошибка при получении информации о пользователях",
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const data = await User.findById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json({
        err: "Произошла ошибка при получении информации о пользователе",
      });
    }
  },
  getBlockedUsers: async (req, res) => {
    try {
      const data = await User.find({ isBlocked: true });
      res.json(data);
    } catch (err) {
      res.json({
        err: "Произошла ошибка при получении информации о пользователях",
      });
    }
  },
};
