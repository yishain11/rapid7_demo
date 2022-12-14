import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  typesList: string[];
  selectedType: string = this.dataService._currentType;
  typeSub: Subscription;  
  riskSub: Subscription;
  riskScore: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.typesList= this.dataService.types;
    this.typeSub = this.dataService.getTypesSub().subscribe(types=>{
      this.typesList = types;
    })
    this.riskSub = this.dataService.getRiskSub().subscribe(risk=>{
      this.riskScore = Math.floor(risk);
    })
  }

  onValueChange(newValue: string){
    this.selectedType = newValue;
    this.dataService.setType = newValue;
  }

  ngOnDestroy(): void {
    this.typeSub.unsubscribe();
    this.riskSub.unsubscribe();
  }

}

