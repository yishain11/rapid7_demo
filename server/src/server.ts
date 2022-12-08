import express, { Express, Request, Response } from 'express';
const server = express();
const port = process.env.NODE_PORT || 1337;
console.log('process.env', process.env.MONGO_URL)

server.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
server.listen(port, () => console.log(`server started on port ${port}`));


/**
 * 
 * const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yishai1234:<password>@cluster0.etvhefb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 */