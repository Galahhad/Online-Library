const { Router } = require("express");
const { userController } = require("../controllers/users.controllers");

const router = Router();

router.post("/user", userController.postUser);
router.delete("/user/:id", userController.deleteUser);
router.patch("/user/:id", userController.patchUser);
router.patch("/user/:user/book/:book/rent", userController.patchRentedBooks);
router.patch(
  "/user/:user/book/:book/unrent",
  userController.patchUnrentedBooks
);
router.patch(
  "/admin/user/:user/book/:book/block",
  userController.patchUserBlock
);
router.patch("/admin/user/:id/unblock", userController.patchUnblockUser);
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.get("/admin/users", userController.getAllUsers);
router.get("/admin/user/:id", userController.getUserById);
router.get("/admin/users/blocked", userController.getBlockedUsers);

module.exports = router;
