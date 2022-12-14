const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Gets order by ID /////////////////////////////////////////////////

const getAllOrders = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
        await client.connect();

  //const { orderId } = req.params;

    const db = client.db("FinalProject");

    const orders = await db.collection("orders").find().toArray();

    return orders
      ? sendResponse(res, 200, orders, "Success! Orders returned.")
      : sendResponse(res, 404, orders, "No orders found!");
  } catch (err) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
          await client.close();

  }
};

module.exports = {
  getAllOrders
};