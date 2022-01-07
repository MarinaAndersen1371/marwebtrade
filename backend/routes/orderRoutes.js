import express from "express";
const router = express.Router();
import {
  protect,
  admin,
  manager,
  support,
} from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAdminOrders,
  updateCustomerCoupon,
  updateReturnToActive,
} from "../controllers/orderController.js";
import {
  getManagerOrders,
  updateInvoiceSend,
  updateOrderCover,
  updateOrderVoucher,
  updateRefundPaid,
  updateReturnClosed,
} from "../controllers/orderManagerController.js";
import {
  getSupportOrders,
  updateOrderDeliver,
  updateOrderDispatch,
  updateOrderReceive,
} from "../controllers/orderSupportController.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAdminOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/manager").get(protect, manager, getManagerOrders);
router.route("/support").get(protect, support, getSupportOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, support, updateOrderDeliver);
router.route("/:id/dispatch").put(protect, support, updateOrderDispatch);
router.route("/:id/receive").put(protect, support, updateOrderReceive);
router.route("/:id/send").put(protect, manager, updateInvoiceSend);
router.route("/:id/cover").put(protect, manager, updateOrderCover);
router.route("/:id/voucher").put(protect, manager, updateOrderVoucher);
router.route("/:id/refund").put(protect, manager, updateRefundPaid);
router.route("/:id/returnclosed").put(protect, manager, updateReturnClosed);
router.route("/:id/coupon").put(protect, updateCustomerCoupon);
router.route("/:id/returnactive").put(protect, updateReturnToActive);

export default router;
