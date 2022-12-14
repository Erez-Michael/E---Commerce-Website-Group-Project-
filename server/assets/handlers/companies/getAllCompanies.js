const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Method to get all Company details
const getAllCompanies = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

    try {
      //Convert string to number
       await client.connect();
       const db = client.db("FinalProject");
  
      const companies = await db.collection("companies").find().toArray();
  
      return (companies.length > 0)
      ? sendResponse(res, 200, companies, "Data retrieved from database.")
      : sendResponse(res, 404, companies, "Data not found.")
    } catch (err) {
      sendResponse(res, 400, err);
    } finally {
      await client.close();
    }
  };

module.exports = { getAllCompanies };