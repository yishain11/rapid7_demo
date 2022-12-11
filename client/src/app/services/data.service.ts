import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constants/constants';
import { ReplaySubject } from 'rxjs';
export interface fetchedData  {
  ClearWeb: {
    [key: string]: number | object
  },
  DarkWeb: {
    [key: string]: number | object
  }
}
export interface DataPoint {
  "date": Date,
  "severity": string,
  "type": string,
  "sourceType": string,
  "networkType": string
}
@Injectable({
  providedIn: 'root'
})


export class DataService {

  // TODO: LOAD JUST THE AGGREGATIONS! DONT NEED THE RESULTS
  _results: fetchedData
  _currentType: string = 'BlackMarkets';
  _allTyps: string[] = [];

  $resultsSubject = new ReplaySubject<fetchedData>()
  $typesSubject = new ReplaySubject<string[]>()

  constructor(private http: HttpClient) { 
  }

  getTypesSub(){
    return this.$typesSubject;
  }
  getResutlsSub(){
    return this.$resultsSubject;
  }


  set setType(newType:string){
    this._currentType = newType
    this.getData();
  }

  get types(){
    return this._allTyps;
  }
  // get data matched by sourceType,
  // aggregated sum aggregation sums of 'severity' and 'type' split by 'networkType'
  
  async getData(){
    const results = await this.http.post<Promise<{data: fetchedData, types: string[]}>>(serverUrl,{sourceType:this._currentType}).toPromise()
    this._results = results.data;
    this.$resultsSubject.next(this._results);
    this._allTyps = results.types;
    this.$typesSubject.next(this._allTyps)
    return this._results;
  }

}
