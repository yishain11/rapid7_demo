import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGO_URL || 'mongodb+srv://yishai1234:1vsKIr6P7bJe30mH@cluster0.etvhefb.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
export default client;
