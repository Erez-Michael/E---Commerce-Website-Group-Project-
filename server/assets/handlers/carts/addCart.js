const { sendResponse  } = require("../../utils");
const { v4: uuidv4 } = require("uuid");

 const { MongoClient } = require("mongodb");
 require("dotenv").config();
 const { MONGO_URI } = process.env;

 const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 };

// Adds a new cart record to the cart collection /; ///////////////////
// Makes sure items stay in cart on refresh, also allows user to have unique cart Id if sign in option exists

const addCart = async (req, res) => {
 const client = new MongoClient(MONGO_URI, options);
 
 try {
    await client.connect();
    const newOrder = {
      _id: uuidv4(),
      products: [],
    };
    const db = client.db("FinalProject");
    const results = await db.collection("carts").insertOne(newOrder);
    return results
      ? sendResponse(res, 201, results, "item added")
      : sendResponse(res, 500, results, "Error creating new order on MongoDb ");
  } catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
      await client.close();
  }
};

module.exports = {
  addCart
};