import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import client from '../utils/mongoClient'

async function initialDataLoad(){
    try {
        await client.connect()
        const dataPath = path.join(__dirname,'../../assets/data.json')
        const data = JSON.parse(await fs.readFile(dataPath,'utf-8'))
        const db = client.db('rapid7_data')
        const col = db.collection('data');
        const size = await col.countDocuments()
        if(size < 10000){
            await col.insertMany(data)
        }
        
    } catch (error) {
        console.log('error', error)
        
    }
    finally {
        await client.close();
    }
}

async function getData(typeVal?:string){
    try {
        await client.connect()
        const db = client.db('rapid7_data')
        const col = db.collection('data');
        const filterObj: {type?: string} = {};
        if(typeVal){
            filterObj.type = typeVal;
        }
        const docs = await col.find(filterObj).toArray()
        return docs;
    } catch (error) {
        console.log('error', error)
    } finally {
        await client.close()

    }
}
const fns = {initialDataLoad,getData}
export default fns;