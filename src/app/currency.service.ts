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

  getRate(id: number, start: string, end: string): Observable<Rate[]> {

    let observable = this.http.get('https://www.nbrb.by/API/ExRates/Rates/Dynamics/' + id + '?startDate=' + start + '&endDate=' + end);
    let mappedObservable = observable.map((response) => {
      this.rates = <Rate[]>response.json(); return this.rates;
    });
    return mappedObservable;
  }

}
