const { sendResponse  } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Deletes specific product from cart ///////////////////////////////
const removeCartItem = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");

    const _id  = req.params._id;
    const { product } = req.body;

    const removeItemFromCart = await db.collection("carts").updateOne({ _id },{ $pull: { products: { product: product }}});

    return removeItemFromCart.modifiedCount !== 0
    ? sendResponse(res, 200, removeItemFromCart, "Product removed from cart")
    : sendResponse(res, 400, null, "[ ERROR ] Product was not removed from Cart");
  } catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
          await client.close();

  }
};
module.exports = { removeCartItem };
