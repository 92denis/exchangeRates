import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CurrencyService } from './currency.service'

import { AppComponent } from './app.component';
import { RateComponent } from './rate/rate.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDatepickerModule, MdInputModule, MdFormFieldModule, MdNativeDateModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    RateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdDatepickerModule,
    MdInputModule,
    MdFormFieldModule,
    MdNativeDateModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
