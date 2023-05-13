import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SankeyComponent } from './sankey.component';
import { SunburstChartComponent } from './sunburst-chart/sunburst-chart.component';
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    SankeyComponent,
    SunburstChartComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
