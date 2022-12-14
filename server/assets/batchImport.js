const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const companies = require("../data/companies.json");
const items = require("../data/items.json");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("FinalProject");
        console.log("database connected!");

        console.log(`Items: ${items.length} items to be inserted to database`);
        const itemInsert = await db.collection("items").insertMany(items);

        console.log(itemInsert);

        console.log(`Items: ${companies.length} items to be inserted to database`);
        const companiesInsert = await db.collection("companies").insertMany(companies);

        console.log(companiesInsert);
    }catch(err){
        console.log(err);
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

batchImport();