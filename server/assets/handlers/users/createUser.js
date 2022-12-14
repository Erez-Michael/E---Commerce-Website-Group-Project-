const { sendResponse } = require("../../utils");
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createUser = async (req, res) => {
     const client = new MongoClient(MONGO_URI, options);

    try {
            await client.connect();

        const user = {...req.body, _id: uuidv4()};
    
        const db = client.db("FinalProject");
        const verifyUser = await db.collection("users").findOne({ email: user.email });

        if(verifyUser?.password !== undefined){
            sendResponse(res, 403, user.email, "[SUCCESS] User already exists. Please proceed to Sign In.")
        } else {
            const newUser = await db.collection("users").insertOne({ ...user });

            newUser
            ? sendResponse(res, 201, newUser, "[SUCCESS] New user created.")
            : sendResponse(res, 404, newUser, "[ERROR] User was not created. Please try again.");
        }
    } catch (err){
        sendResponse(res, 400, null, `${err}`);
    } finally { 
      await client.close();
    }
}

module.exports = {createUser};