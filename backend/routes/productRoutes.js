import express from "express";
const router = express.Router();
import {
  protect,
  admin,
  manager,
  franchise,
} from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getManagerProducts,
  getFranchiseProducts,
  updateManagerProduct,
  topRatedProducts,
  createProductReview,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/manager").get(protect, manager, getManagerProducts);
router.route("/franchise").get(protect, franchise, getFranchiseProducts);
router.route("/top").get(topRatedProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
router.route("/:id/cancel").put(protect, admin, deleteProduct);
router.route("/:id/manager").put(protect, manager, updateManagerProduct);

export default router;
