const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Gets order by ID /////////////////////////////////////////////////

const getOrdersByUser = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
  await client.connect();

  const { _id } = req.params;
  console.log(_id);

    const db = client.db("FinalProject");

    const orders = await db.collection("orders").find({userId: _id}).toArray();

    return orders
      ? sendResponse(res, 200, orders, "Success! Order found by id")
      : sendResponse(res, 404, orders, "No orders found!");
  } catch (err) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
      await client.close();
  }
};

module.exports = {
    getOrdersByUser
};