import express from 'express';
import FNS from './utils/functions.js'
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();
const port = process.env.NODE_PORT || 1337;

server.use(cors())
server.use(bodyParser.json())

server.post('/data',async (req, res)=>{
  const filterObj = req.body;
  const data = await FNS.processData(filterObj.sourceType);
  res.send(JSON.stringify(data)).end()
})

  

server.listen(port, async () => {
  try {
    await FNS.connectClient();
    await FNS.loadDataToDb();
  } catch (error) {
    console.log('error', error)
  } finally {
    console.log('server listening');
  }
});