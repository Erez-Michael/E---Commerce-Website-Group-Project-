"use strict";

const express = require("express");
const morgan = require("morgan");

const { createUser } = require("./handlers/users/createUser");
const { handleSignIn } = require("./handlers/users/handleSignIn");
const { getAllItems } = require("./handlers/items/getAllItems");
const { getItemById } = require("./handlers/items/getItemById");
const { getCompanyById } = require("./handlers/companies/getCompanyById");
const { getAllCompanies } = require("./handlers/companies/getAllCompanies");
const { addCart } = require("./handlers/carts/addCart");
const { getCartById } = require("./handlers/carts/getCartById");
const { addItemToCart } = require("./handlers/carts/addItemToCart");
const { deleteCart } = require("./handlers/carts/deleteCart");
const { removeCartItem } = require("./handlers/carts/removeCartItem");
const { createOrder } = require("./handlers/orders/createOrder");
const { getAllOrders } = require("./handlers/orders/getAllOrders");
const { getOrderById } = require("./handlers/orders/getOrder");
const { getOrdersByUser } = require("./handlers/orders/getOrdersByUser");
const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //  |#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|
  //  |#|                           ENDPOINTS                               |#|
  //  |#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|

  //endpoint to handle user sign in
  .post("/sign-in", handleSignIn)

  //endpoint to create new user sign in
  .post("/sign-up", createUser)

  //endpoint to get all items
  .get("/items", getAllItems)

  //endpoint to grab all companies
  .get("/companies/", getAllCompanies)

  //endpoint to grab item by id
  .get("/item/:_id", getItemById)

  //endpoint to get company by id
  .get("/company/:_id", getCompanyById)

  //endpoint to create new cart _id for session
  // This endpoint can also be used to assign a cart _id to signed in user
  //endpoint to get all items in cart
  .get("/cart/:_id", getCartById)

  .post("/cart", addCart)

  //endpoint to add item to cart
  .patch("/cart/:_id", addItemToCart)
  
  //endpoint to remove product from cart with cart _id
  .patch("/remove-product-cart/:_id", removeCartItem )
  
  //endpoint to remove product from cart with cart _id
  .delete("/cart/:_id", deleteCart )

  //endpoint to get all orders
  .get("/orders", getAllOrders)

  //endpoint to order by Id
  .get("/order/:_id", getOrderById)

  //endpoint to order by User Id
  .get("/userOrder/:_id", getOrdersByUser)

  //endpoint to create a new order
  .post("/order", createOrder)

  

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
