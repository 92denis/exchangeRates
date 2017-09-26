import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './currency'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  selectedCurrency : number;
  startDate: Date;
  endDate: Date;
  currencies: Currency[] = [];
  constructor(private currencyService: CurrencyService) { 
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.endDate = new Date();
  }

  ngOnInit(): void {
    this.currencyService.getData().subscribe((data) => {
      this.currencies = data.json()
    });
  }
}
