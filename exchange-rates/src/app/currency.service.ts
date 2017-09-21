import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CurrencyService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('https://www.nbrb.by/API/ExRates/Currencies');
  }
  // getRate(){
  //   return this.http.get('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0');
  // }
  getRate(){
    return this.http.get('https://www.nbrb.by/API/ExRates/Rates/Dynamics/190?startDate=2016-6-1&endDate=2016-6-30');
  }

}
