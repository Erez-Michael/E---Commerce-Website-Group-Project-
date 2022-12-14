const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Method to get Company details by company ID from Database
const getCompanyById = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    //Convert string to number
    const  _id   = Number(req.params._id);
    
    const db = client.db("FinalProject");
    const company = await db.collection("companies").findOne({ _id });

    return (company !== null) 
      ? sendResponse(res, 200, company, "Data retrieved from database.")
      : sendResponse(res, 404, company, "Data not found.")
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
          await client.close();
  }
};

module.exports = { getCompanyById };