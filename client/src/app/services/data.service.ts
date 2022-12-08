import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  async getData():Promise<any>{
    const data = await this.http.post('http://localhost:1337/data',{}).toPromise()
    console.log('data in client', data)
    return data;
  }
}
