const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Deletes an order from the cart ///////////////////////////////////

const deleteCart = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");
    const _id = req.params._id;


    const deleteCart = await db.collection("carts").deleteOne({ _id });

    return deleteCart.deletedCount !== 0
    ?sendResponse(res, 200, { deleteCart }, "Cart deleted")
    :sendResponse(res, 400, "[ ERROR ] Not able to delete cart");
  } catch (error) {
    sendResponse(res, 400, null, `${error}`);
  } finally {
  await client.close();
  }
};
module.exports = {deleteCart};
