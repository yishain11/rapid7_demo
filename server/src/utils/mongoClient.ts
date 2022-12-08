import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_URL;
let client;

if(uri){
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
}
export default client;
