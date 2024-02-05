// /backend/src/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://abhay:abhay24@personal-portfolio.gtxsaod.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function disconnect() {
  try {
    await client.close();
    console.log("Disconnected from MongoDB!");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    process.exit(1);
  }
}

module.exports = {
  connect,
  disconnect,
  getClient: () => client,
};
