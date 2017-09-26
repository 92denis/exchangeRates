import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'hammerjs';

@Injectable()
export class CurrencyService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('https://www.nbrb.by/API/ExRates/Currencies');
  }
  // getRate(){
  //   return this.http.get('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0');
  // }
  getRate(id: number, start : string, end: string){
    return this.http.get('https://www.nbrb.by/API/ExRates/Rates/Dynamics/'+id+'?startDate='+start+'&endDate='+end);
  }

}
