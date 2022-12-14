const {  sendResponse  } = require("../../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Add a new item to the cart ///////////////////////////////////////

const addItemToCart = async (req, res) => {
   const client = new MongoClient(MONGO_URI, options);
   const _id = req.params._id;
   const { product, quantity } = req.body;
   
   try {
    await client.connect();
    const db = client.db("FinalProject");
    // check to see if cart already contains products
    const checkProduct = await db.collection("carts").findOne({ _id, products: { $elemMatch: { product } } });

    // Case: cart does not contain product. Add product with quantity.
    if (checkProduct == null) {
      const queryObj = { _id };
      const updateObj = { $push: { "products": { product: product, quantity: quantity } } };

      const updatedCart = await db.collection("carts").updateOne(queryObj, updateObj);
      
      return updatedCart
        ? sendResponse(res, 200, updatedCart, "[ SUCCESS ]: cart updated")
        : sendResponse(res, 500, null, "[ ERROR ]: updating cart in MongoDB");
    }
    // Case: cart contains product. Update quantity for product.
    else {
      const query = { _id, products: { $elemMatch: { product } } };
      const updateQty = { $set: { "products.$.quantity": quantity } };

      const updateQuantity = await db.collection("carts").updateOne(query, updateQty);

      return updateQuantity
        ? sendResponse(res, 200, updateQuantity, "[ SUCCESS ]: quantity updated")
        : sendResponse(res, 400, null, "[ ERROR ]: updating cart in MongoDB");
    }
  }
  catch (error) {
    sendResponse(res, 400, null, `${err}`);
  } finally {
            await client.close();
  };
}



module.exports = {addItemToCart};
