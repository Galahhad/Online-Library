const Genre = require("../models/Genre.model");
module.exports.genreController = {
  postGenre: async (req, res) => {
    try {
      const { title, description } = req.body;
      await Genre.create({ title, description });
      res.json("Жанр опубликован");
    } catch (err) {
      res.json({ err: "Произошла ошибка при публикации жанра" });
    }
  },
  deleteGenre: async (req, res) => {
    try {
      await Genre.findByIdAndDelete(req.params.id);
      res.json("Жанр удален");
    } catch (err) {
      res.json({ err: "Произошла ошибка при удалении жанра" });
    }
  },
  patchGenre: async (req, res) => {
    try {
      const { title, description } = req.body;
      await Genre.findByIdAndUpdate(req.params.id, { title, description });
      res.json("Жанр обновлен");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении жанра" });
    }
  },
  getGenreById: async (req, res) => {
    try {
      const data = await Genre.findById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о жанре" });
    }
  },
  getAllGenres: async (req, res) => {
    try {
      const data = await Genre.find();
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о жанрах" });
    }
  },
};
