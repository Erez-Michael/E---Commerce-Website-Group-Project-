const { sendResponse } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleSignIn = async (req, res) => {
     const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const { email, password } = req.body;
        const db = client.db("FinalProject");

        const verifyUser = await db.collection("users").findOne({ email, password });
        const data = {...verifyUser};

        verifyUser
        ? sendResponse(res, 200, data, "[SUCCESS] User found.")
        : sendResponse(res, 404, data, "[ERROR] User not found.");

    } catch (err){
        sendResponse(res, 400, null, `${err}`);
    } finally { 
      await client.close();
    }
}

module.exports = {handleSignIn};