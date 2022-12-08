import express, { Express, Request, Response } from 'express';
import FNS from './utils/functions'

const server = express();
const port = process.env.NODE_PORT || 1337;
let db;

server.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

server.post('/data',async (req: Request, res: Response)=>{
  const data = await FNS.getData();
  res.send(JSON.stringify(data)).end()
})

  

server.listen(port, async () => {
  try {
    await FNS.initialDataLoad() 
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('server listening');
    
  }
});


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