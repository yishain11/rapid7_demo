import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname,'../../assets/data.json')
const data = JSON.parse(await fs.readFile(dataPath,'utf-8'))
const orginizedData = {}

data.forEach(dataObj=>{
    if(!(dataObj.sourceType in orginizedData)){
        orginizedData[dataObj.sourceType] = {
            DarkWeb: {
                severity:{
                    high: 0,
                    medium: 0,
                    low: 0
                }
            },
            ClearWeb: {
                severity:{
                    high: 0,
                    medium: 0,
                    low: 0
                }
            }
        }
    }
    // add severity
    orginizedData[dataObj.sourceType][dataObj.networkType]['severity'][dataObj.severity] += 1
    // sum types fields 
    if(!(dataObj.type in orginizedData[dataObj.sourceType][dataObj.networkType])){
        orginizedData[dataObj.sourceType][dataObj.networkType][dataObj.type] = 1
    } else {
        orginizedData[dataObj.sourceType][dataObj.networkType][dataObj.type] += 1
    }
})
console.log('orginizedData', orginizedData)