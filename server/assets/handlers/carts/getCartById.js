const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Get cart and its contents /; ///////////////////
const getCartById = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FinalProject");
    const _id = req.params._id;

    const results = await db.collection("carts").findOne({_id});

    return results
      ? sendResponse(res, 201, results, "Item found")
      : sendResponse(res, 404, results, "Error: Item not found");
  } catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
    await client.close();
  }
};


module.exports = { getCartById };