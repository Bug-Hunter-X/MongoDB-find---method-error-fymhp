```javascript
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('mydb');
    const collection = database.collection('mycollection');

    // Insert a single document
    const doc = {
      name: 'John Doe',
      age: 30
    };
    const result = await collection.insertOne(doc);
    console.log(`Inserted ${result.insertedCount} documents`);

    // Find documents with a certain condition
    const query = { age: { $gt: 25 } };
    const cursor = collection.find(query);
    const results = await cursor.toArray();
    console.log(results);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
```