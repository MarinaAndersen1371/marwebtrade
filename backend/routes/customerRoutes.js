import express from "express";
const router = express.Router();
import { protect, admin, manager } from "../middleware/authMiddleware.js";
import {
  authCustomer,
  registerCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  getAdminCustomers,
  getCustomerDetails,
  updateCustomerTest,
  updateAdminCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import {
  getManagerCustomers,
  updateToPrime,
  updateToFranchise,
  updateTestToPaid,
  updateTestResult,
  updateTestScore,
  updateCustomerCoupon,
} from "../controllers/customerManagerController.js";

router.route("/").post(registerCustomer).get(protect, admin, getAdminCustomers);
router.route("/manager").get(protect, manager, getManagerCustomers);
router.route("/login").post(authCustomer);
router
  .route("/profile")
  .get(protect, getCustomerProfile)
  .put(protect, updateCustomerProfile);
router.route("/:id").get(protect, getCustomerDetails);
router.route("/:id/test").put(protect, updateCustomerTest);
router.route("/:id/prime").put(protect, manager, updateToPrime);
router.route("/:id/testpaid").put(protect, manager, updateTestToPaid);
router.route("/:id/franchise").put(protect, manager, updateToFranchise);
router.route("/:id/testresult").put(protect, manager, updateTestResult);
router.route("/:id/testscore").put(protect, manager, updateTestScore);
router.route("/:id/coupon").put(protect, manager, updateCustomerCoupon);
router.route("/:id/admin").put(protect, admin, updateAdminCustomer);
router.route("/:id/cancel").put(protect, admin, deleteCustomer);

export default router;
