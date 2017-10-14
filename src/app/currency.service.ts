import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Rate } from "./rate";
import { Currency } from './currency';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {
  rates: Rate[] = [];
  currencies: Currency[] = [];
  constructor(private http: Http) { }

  getCurrency(): Observable<Currency[]> {
    let observable = this.http.get('https://www.nbrb.by/API/ExRates/Currencies');
    let mappedObservable = observable.map((response) => {
      this.currencies = <Currency[]>response.json(); return this.currencies;
    });
    return mappedObservable;
  }

  getRate(id: number, startDate: Date, endDate: Date): Observable<Rate[]> {
    let start = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
    let end = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();

    let observable = this.http.get('https://www.nbrb.by/API/ExRates/Rates/Dynamics/' + id + '?startDate=' + start + '&endDate=' + end);
    let mappedObservable = observable.map((response) => {
      this.rates = <Rate[]>response.json();
       
      
      for (let i = 0 ; i < this.rates.length; i++) {
        this.rates[i].Date =this.rates[i].Date.substring(0, 10);
      } 

      for (let i = 1; i < this.rates.length; i++) {
        this.rates[i].delta = +(this.rates[i].Cur_OfficialRate - this.rates[i - 1].Cur_OfficialRate).toFixed(4);
      } 
      return this.rates;

    });
    return mappedObservable;
  }

}
