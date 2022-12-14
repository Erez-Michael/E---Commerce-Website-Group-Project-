const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//returns item based on ID
const getItemById = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
      await client.connect();
      const _id = Number(req.params._id);
  
      const db = client.db("FinalProject");

      const item = await db.collection("items").findOne({ _id });
  
      return item
        ? sendResponse(res, 200, item, "Successfully retrieved item!")
        : sendResponse(res, 404, item, "Could not find specific item, check id!")
    } catch (err) {
      sendResponse(res, 400, err);
    } finally {
      await client.close();
    }
  };

  module.exports = {
    getItemById
  };
  