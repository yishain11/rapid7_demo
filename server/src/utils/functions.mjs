import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let fetchedOrginizedData = {};
let rawData = [];

async function loadLocalData (){
    const dataPath = path.join(__dirname, '../../assets/data.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
    rawData = data;
    
    return data;
}

async function calculateRisk (){
    if (!rawData || 0 === rawData.length){
        await loadLocalData();
    }
    // sort raw data by date
    rawData = rawData.sort((a, b)=>{
        return new Date(b.date) - new Date(a.date);
    });
    const recent = rawData.slice(0, 300);
    const weights = {
        severity: {
            high: 100,
            medium: 70,
            low: 40,

        },
        types: {
            vip: 100,
            AttackIndication: 80,
            ExploitableData: 60,
            BrandSecurity: 40,
            DataLeakage: 20,
            Phishing: 10
        }
    };
    const severity = {
        high: 0,
        medium: 0,
        low: 0
    };
    const types = {
        vip: 0,
        AttackIndication: 0,
        ExploitableData: 0,
        BrandSecurity: 0,
        DataLeakage: 0,
        Phishing: 0
    };
    recent.forEach((dataObj)=>{
        severity[dataObj.severity.toLowerCase()] += 1;
        types[dataObj.type] += 1;
    });
    // calc severity
    let severityScore = 0;
    for (const key in severity) {
        if (Object.hasOwnProperty.call(severity, key)) {
            const val = severity[key];
            severityScore += (val*weights['severity'][key]);
        }
    }
    severityScore = severityScore / 300;
    let typeScore = 0;
    for (const key in types) {
        if (Object.hasOwnProperty.call(types, key)) {
            const val = types[key];
            typeScore += (val* weights['types'][key]);
            
        }
    }
    typeScore = typeScore / 300;
    const riskScore = (severityScore + typeScore) / 2;
    
    return riskScore;
}

async function processData (sourceType){
    if (fetchedOrginizedData[sourceType]){
        return fetchedOrginizedData[sourceType];
    }
    const data = await loadLocalData();
    const orginizedData = {};
    const allTypes = [];
    data.forEach(dataObj=>{
        if (!(dataObj.sourceType in orginizedData)){
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
            };
        }
        if (!allTypes.includes(dataObj.sourceType)){
            allTypes.push(dataObj.sourceType);
        }
        // add severity
        orginizedData[dataObj.sourceType][dataObj.networkType]['severity'][dataObj.severity.toLowerCase()] += 1;
        // sum types fields
        if (!(dataObj.type in orginizedData[dataObj.sourceType][dataObj.networkType]['values'])){
            orginizedData[dataObj.sourceType][dataObj.networkType]['values'][dataObj.type] = 1;
        } else {
            orginizedData[dataObj.sourceType][dataObj.networkType]['values'][dataObj.type] += 1;
        }
    });
    const finalResults = {data: orginizedData[sourceType], types: allTypes};
    fetchedOrginizedData = finalResults;
    
    return finalResults;
}

const fns = { calculateRisk, loadLocalData, processData };
export default fns;