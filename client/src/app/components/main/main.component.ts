import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { DataPoint, DataService, fetchedData } from 'src/app/services/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data: fetchedData;
  $dataSubject: ReplaySubject<fetchedData>
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.$dataSubject = this.dataService.getResutlsSub();
    this.$dataSubject.subscribe(data=>{
      this.data = data;
    })
  }

  ngOnDestroy(){
    this.$dataSubject.unsubscribe();
  }
}
