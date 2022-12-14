const { sendResponse } = require("../../utils");

 const { MongoClient } = require("mongodb");
 require("dotenv").config();
 const { MONGO_URI } = process.env;

 const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 };

//returns an array of all Items
const getAllItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("FinalProject");
    const items = await db.collection("items").find().toArray();

    return items
      ? sendResponse(res, 200, items, "Successfully retrieved all items!")
      : sendResponse(res, 404, items, "Could not find items!") 
  } catch (err) {
    sendResponse(res, 400, err);
  } finally { 
    await client.close();
  }
};

module.exports = {
  getAllItems
};
