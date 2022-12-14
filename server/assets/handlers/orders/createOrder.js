const {  sendResponse } = require("../../utils");
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createOrder = async (req, res) => {
     const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const _id = uuidv4();
        const order = {...req.body.order, _id};

        const db = client.db("FinalProject");

        //Order validations
        switch(true){
            case (!/^[A-Za-z\s]*$/.test(order.fname) || !/^[A-Za-z\s]*$/.test(order.lname)):
                return sendResponse(res, 400, order, "Only alphabets are accepted in Names.");

            case (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(order.phone)):
                return sendResponse(res, 400, order, "Invalid phone number.");

            case (!/^\d+$/.test(order.creditCard)):
                return sendResponse(res, 400, order, "Invalid Credit Card details. Only digits are accepted.");

            case (order.creditCard.length <= 13 || order.creditCard.length > 19) :
                return sendResponse(res, 400, order, "Invalid credit card details.");
                                                        
            case (!/^\d+$/.test(order.exp) || order.exp.length !== 4):
                return sendResponse(res, 400, order, "Invalid Expiry Date. Please provide expiry Date in MMYY format.");
                
            case (!/^\d+$/.test(order.svc)):
                return sendResponse(res, 400, order, "Invalid SVC details. Only digits are accepted.");

            case (order.svc.length !== 3):
                return sendResponse(res, 400, order, "Invalid SVC.");
        }

        // Insert Order if validations are successful
        const results = await db.collection("orders").insertOne(order);

        return results
        ? sendResponse(res, 201, results, "Order created successfully!")
        : sendResponse(res, 400, results, "Error encountered while creating order!")
    }catch(err){
        sendResponse(res, 400, null, `${err}`);
    } finally {
              await client.close();

    }
}

module.exports = { createOrder };