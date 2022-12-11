import FNS from '../src/utils/functions';

test('check data loading',async ()=>{
   const data = await FNS.loadLocalData()
   expect(data.toBeDefined())
})