const { Router } = require("express");
const { reviewController } = require("../controllers/reviews.controller");

const router = Router();

router.post("/book/:book/user/:user/review", reviewController.postReview);
router.delete("/book/user/review/:id", reviewController.deleteReview);
router.patch("/book/user/review/:id", reviewController.patchReview);
router.get("/review/:id", reviewController.getReviewById);
router.get("/reviews", reviewController.getAllReviews);
router.get("/book/:id/reviews", reviewController.getBookReviews);
router.get("/user/:id/reviews", reviewController.getUserReviews);
router.get("/admin/review/:id", reviewController.getReviewById);
router.get("/admin/reviews", reviewController.getAllReviews);
router.get("/admin/book/:id/reviews", reviewController.getBookReviews);
router.get("/admin/user/:id/reviews", reviewController.getUserReviews);

module.exports = router;
