import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Rate } from './rate';
import { Currency } from './currency';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {
  rates: Rate[] = [];
  currencies: Currency[] = [];
  constructor(private http: Http) { }

  getCurrency(): Observable<Currency[]> {
    const observable = this.http.get('http://www.nbrb.by/API/ExRates/Currencies');
    const mappedObservable = observable.map((response) => {
      this.currencies = <Currency[]>response.json(); return this.currencies;
    });
    return mappedObservable;
  }

  getRate(id: number, startDate: Date, endDate: Date): Observable<Rate[]> {
    const start = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
    const end = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();

    const observable = this.http.get('https://www.nbrb.by/API/ExRates/Rates/Dynamics/' + id + '?startDate=' + start + '&endDate=' + end);
    const mappedObservable = observable.map((response) => {
      this.rates = <Rate[]>response.json();


      for (let i = 0; i < this.rates.length; i++) {
        this.rates[i].Date = this.rates[i].Date.substring(0, 10);
        if (i !== 0) {
          this.rates[i].delta = +(this.rates[i].Cur_OfficialRate - this.rates[i - 1].Cur_OfficialRate).toFixed(4);
        }
      }
      return this.rates;

    });
    return mappedObservable;
  }

}
