const { Router } = require("express");
const { genreController } = require("../controllers/genres.controller");

const router = Router();

router.post("/admin/genre", genreController.postGenre);
router.delete("/admin/genre/:id", genreController.deleteGenre);
router.patch("/admin/genre/:id", genreController.patchGenre);
router.get("/admin/genre/:id", genreController.getGenreById);
router.get("/admin/genres", genreController.getAllGenres);
router.get("/genre/:id", genreController.getGenreById);
router.get("/genres", genreController.getAllGenres);

module.exports = router;
