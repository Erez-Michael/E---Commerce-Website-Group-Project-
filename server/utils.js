const sendResponse = (res, status, data, message = "No message included.") => {
  return res.status(status).json({ status, data, message });
};

// Method that handles opening and closing connections to database
/*const connectToDatabase = async (action) => {
  const { MongoClient } = require("mongodb");
  require("dotenv").config();
  const { MONGO_URI } = process.env;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(MONGO_URI, options);
await client.connect();
  switch (action) {
    case "open": {
      await client.connect();
      console.log("Database has connected successfully!");

      return client.db("FinalProject");
    }
    case "close": {
      console.log(client);
      client.close();
      console.log("Database has disconnected successfully!");

      return;
    }
  }
};

*/
module.exports = { sendResponse };