const Book = require("../models/Book.model");
module.exports.bookController = {
  postBook: async (req, res) => {
    try {
      const { author, title, description, genre, isRented, renter } = req.body;
      await Book.create({
        author,
        title,
        description,
        genre,
        isRented,
        renter,
      });
      res.json("Книга опубликована");
    } catch (err) {
      res.json({ err: "Произошла ошибка при публикации книги" });
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json("Книга удалена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при удалении книги" });
    }
  },
  patchBook: async (req, res) => {
    try {
      const { author, title, description, genre } = req.body;
      await Book.findByIdAndUpdate(req.params.id, {
        author,
        title,
        description,
        genre,
      });
      res.json("Информация о книге обновлена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении книги" });
    }
  },
  getBookById: async (req, res) => {
    try {
      const data = await Book.findById(req.params.id).populate(
        "genre",
        "title"
      );
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о книге" });
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const data = await Book.find().populate("genre", "title");
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о книгах" });
    }
  },
  getGenreBooks: async (req, res) => {
    try {
      const data = await Book.find({ genre: req.params.id }).populate(
        "genre",
        "title"
      );
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о книгах" });
    }
  },
  getRentedBooks: async (req, res) => {
    try {
      const data = await Book.find({ isRented: req.params.id }).populate(
        "genre",
        "title"
      );
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о книгах" });
    }
  },
};
