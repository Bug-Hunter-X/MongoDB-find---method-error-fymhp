```javascript
const { MongoClient } = require('mongodb');

const uri = "YOUR_MONGODB_URI"; // Replace with your MongoDB connection string

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('mydb');
    const collection = database.collection('mycollection');

    // Insert a single document (same as in bug.js)
    const doc = {
      name: 'John Doe',
      age: 30
    };
    const result = await collection.insertOne(doc);
    console.log(`Inserted ${result.insertedCount} documents`);

    // Find documents with a certain condition and properly close the cursor
    const query = { age: { $gt: 25 } };
    const cursor = collection.find(query);
    const results = await cursor.toArray(); // Retrieve all results
    console.log(results);
    await cursor.close(); // Close the cursor

  } finally {
    await client.close(); // Ensure the client connection is closed
  }
}
run().catch(console.dir);
```