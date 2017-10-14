import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CurrencyService } from './currency.service'

import { AppComponent } from './app.component';
import { RateComponent } from './rate/rate.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule,MatButtonModule, MatInputModule,MatMenuModule, MatFormFieldModule, MatNativeDateModule, MatTabsModule, MatToolbarModule, MatSelectModule, MatRadioModule,MatIconModule} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { RateChartComponent } from './rate-chart/rate-chart.component';
import { FiterCurrensiesPipe } from './fiter-currensies.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RateComponent,
    RateChartComponent,
    FiterCurrensiesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ChartsModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
