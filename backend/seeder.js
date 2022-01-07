import mongoose from "mongoose";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import products from "./data/products.js";
import customers from "./data/customers.js";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import Ticket from "./models/ticketModel.js";
import Customer from "./models/customerModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Ticket.deleteMany();
    await Product.deleteMany();
    await Customer.deleteMany();

    const createdCustomers = await Customer.insertMany(customers);
    const admin = createdCustomers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, customer: admin };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Ticket.deleteMany();
    await Product.deleteMany();
    await Customer.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
