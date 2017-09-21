import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CurrencyService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('http://www.nbrb.by/API/ExRates/Currencies');
  }
  getRate(){
    return this.http.get('http://www.nbrb.by/API/ExRates/Rates');
  }

}
