import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  selectedCurrency: number;
  startDate: Date;
  endDate: Date;
  currenciesCurrent: Currency[] = [];
  currencies: Currency[] = [];
  constructor(private currencyService: CurrencyService) {
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.endDate = new Date();
    this.selectedCurrency = 298;

  }

  ngOnInit(): void {
    this.currencyService.getData().subscribe((data) => {
      this.currencies = data.json();
      this.currenciesCurrent = this.currencies.filter(current => {
        return new Date(current.Cur_DateEnd) >= new Date();
      });
    });

  }
}
