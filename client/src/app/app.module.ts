import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { RiskMeterComponent } from './components/risk-meter/risk-meter.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ValueTableComponent } from './components/card/value-table/value-table.component';
import { PiChartComponent } from './components/card/pi-chart/pi-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RiskMeterComponent,
    DoughnutChartComponent,
    HeaderComponent,
    MainComponent,
    ValueTableComponent,
    PiChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
