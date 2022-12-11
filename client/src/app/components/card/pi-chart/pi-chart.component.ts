import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pi-chart',
  templateUrl: './pi-chart.component.html',
  styleUrls: ['./pi-chart.component.css']
})
export class PiChartComponent implements OnInit {
  @Input() values: {high: number, medium: number, low: number}

  constructor() { }

  ngOnInit(): void {
  }

}
