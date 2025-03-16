import { MongoClient } from "mongodb";

// Ensure all required variables are present
if (
  !process.env.MONGODB_CLUSTER_ADDRESS ||
  !process.env.MONGODB_USERNAME ||
  !process.env.MONGODB_PASSWORD
) {
  console.error("Missing required MongoDB environment variables");
  process.exit(1);
}

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority&appName=Cluster0`;

// Add connection options specifically for CI environments
const options = {
  connectTimeoutMS: 30000, // Increased timeout
  socketTimeoutMS: 45000, // Increased socket timeout
  serverSelectionTimeoutMS: 30000, // Increased server selection timeout
};

// Database singleton
let database = null;

async function connectToDatabase() {
  if (database) {
    return database;
  }

  const client = new MongoClient(uri, options);

  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");

    database = client.db(dbName);
    return database;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    await client.close();
    console.log("Connection closed after error");
    throw error;
  }
}

export default connectToDatabase;
