import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//Desc: Get all Manager Orders
//Route: GET/api/orders/ Manager
//Access: Priate / Manager
const getManagerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "customer",
    "id firstName name deleted"
  );
  res.json(orders);
});

//Desc: Update Invoice to sent
//Route: PUT/api/orders/:id/send
//Access: Private / Manager
const updateInvoiceSend = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.invoiceSent = true;
    order.invoicedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Device protection to active
//Route: PUT/api/orders/:id/cover
//Access: Private / Manager
const updateOrderCover = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isExtra = true;
    order.extraAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Voucher to active
//Route: PUT/api/orders/:id/voucher
//Access: Private / Manager
const updateOrderVoucher = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.voucherActive = true;
    order.totalPrice = order.totalPrice - 10;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Return to paid
//Route: PUT/api/orders/:id/refund
//Access: Private / Manager
const updateRefundPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.refund = true;
    order.refunddAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Return to closed
//Route: PUT/api/orders/:id/returnclosed
//Access: Private / Manager
const updateReturnClosed = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.returnClosed = true;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getManagerOrders,
  updateInvoiceSend,
  updateOrderCover,
  updateOrderVoucher,
  updateRefundPaid,
  updateReturnClosed,
};
