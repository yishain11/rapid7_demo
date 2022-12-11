import express from 'express';
import FNS from './utils/functions.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();
const port = process.env.NODE_PORT || 1337;

server.use(cors());
server.use(bodyParser.json());

server.post('/data', async (req, res)=>{
    const filterObj = req.body;
    const data = await FNS.processData(filterObj.sourceType);
    res.send(JSON.stringify(data)).end();
});

server.get('/risk', async (req, res)=>{
    const riskScore = await FNS.calculateRisk();
    res.send(JSON.stringify({riskScore})).end();
});
  

server.listen(port, () => {
    console.log('server listening on', port);
});