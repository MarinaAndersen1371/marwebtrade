import bcrypt from "bcryptjs";

const customers = [
  {
    name: "Admin",
    firstName: "Admin User",
    email: "admin@web.de",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Manager",
    firstName: "Manager User",
    email: "manager@web.de",
    password: bcrypt.hashSync("123456", 10),
    isManager: true,
  },
  {
    name: "Support",
    firstName: "Support User",
    email: "support@web.de",
    password: bcrypt.hashSync("123456", 10),
    isSupport: true,
  },
  {
    name: "Novizki",
    firstName: "Klava",
    email: "klava@web.de",
    password: bcrypt.hashSync("123456", 10),
    gender: "Female",
    birthday: "1990-08-03",
    image: "/images/customer1.jpg",
  },
  {
    name: "Johnson",
    firstName: "John",
    email: "john@web.de",
    password: bcrypt.hashSync("123456", 10),
    birthday: "1980-01-01",
    image: "/images/customer2.jpg",
  },
];

export default customers;
