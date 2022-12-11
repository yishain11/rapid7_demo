import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import client from './mongoClient.js'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = undefined;
let col = undefined;

let fetchedOrginizedData = {}

async function connectClient(){
    try {
        await client.connect()
        db = client.db('rapid7_data')
        col = db.collection('data');
    } catch(error){
        console.log('error connectClient', error)
        throw Error(error)
    }
}

async function closeClient(){
    try {
        await client.close();
        db = undefined;
        col = undefined;
    } catch(error){
        console.log('error closeClient', error)
        throw Error(error)
    }
}

async function loadDataToDb(){
    try {
            if(db && col){
                    const dataPath = path.join(__dirname,'../../assets/data.json')
                    const data = JSON.parse(await fs.readFile(dataPath,'utf-8'))
                    const size = await col.countDocuments()
            if(size < 10000){
                await col.insertMany(data)
            }
        }
        
    } catch (error) {
        console.log('error in loadDataToDb', error)
        throw Error(error)
    }
    finally {
        await closeClient();
    }
}

async function loadLocalData(){
    const dataPath = path.join(__dirname,'../../assets/data.json')
    const data = JSON.parse(await fs.readFile(dataPath,'utf-8'))
    return data;
}

async function processData(sourceType){
    if(fetchedOrginizedData[sourceType]){
        return fetchedOrginizedData[sourceType];
    }
    const data = loadLocalData();
    const orginizedData = {}
    const allTypes = []
    data.forEach(dataObj=>{
        if(!(dataObj.sourceType in orginizedData)){
            orginizedData[dataObj.sourceType] = {
                DarkWeb: {
                    severity:{
                        high: 0,
                        medium: 0,
                        low: 0
                    },
                    values: {}
                },
                ClearWeb: {
                    severity:{
                        high: 0,
                        medium: 0,
                        low: 0
                    },
                    values: {}
                }
            }
        }
        if(!allTypes.includes(dataObj.sourceType)){
            allTypes.push(dataObj.sourceType);
        }
        // add severity
        orginizedData[dataObj.sourceType][dataObj.networkType]['severity'][dataObj.severity.toLowerCase()] += 1
        // sum types fields 
        if(!(dataObj.type in orginizedData[dataObj.sourceType][dataObj.networkType]['values'])){
            orginizedData[dataObj.sourceType][dataObj.networkType]['values'][dataObj.type] = 1
        } else {
            orginizedData[dataObj.sourceType][dataObj.networkType]['values'][dataObj.type] += 1
        }
    })
    return {data: orginizedData[sourceType], types: allTypes};
}

async function loadDbData(filterObj = {}){
    try {
        if(!db){
            await connectClient();
        }
        const docs = await col.find(filterObj).toArray()
        const agg = await col.aggregate([{
            $group: {
                sourceType: { $sourceType: "sourceType"}
            }
        }])
        return docs;
    } catch (error) {
        console.log('error loadDbData', error)
        throw Error(error)
    }
}


const fns = {loadLocalData, processData,loadDataToDb,loadDbData,connectClient,closeClient}
export default fns;