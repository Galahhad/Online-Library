const { Router } = require("express");
const { bookController } = require("../controllers/books.controller");

const router = Router();

router.post("/admin/book", bookController.postBook);
router.delete("/admin/book/:id", bookController.deleteBook);
router.patch("/admin/book/:id", bookController.patchBook);
router.get("/book/:id", bookController.getBookById);
router.get("/books", bookController.getAllBooks);
router.get("/books/genre/:id", bookController.getGenreBooks);
router.get("/books/rented/:id", bookController.getRentedBooks);
router.get("/admin/book/:id", bookController.getBookById);
router.get("/admin/books", bookController.getAllBooks);
router.get("/admin/books/genre/:id", bookController.getGenreBooks);
router.get("/admin/books/rented/:id", bookController.getRentedBooks);

module.exports = router;
