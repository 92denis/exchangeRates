import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  selectedCurrency: Currency;
  startDate: Date;
  endDate: Date;
  currenciesCurrent: Currency[] = [];
  currencies: Currency[] = [];


  constructor(private currencyService: CurrencyService) {
    this.startDate = new Date();
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.endDate = new Date();
    this.selectedCurrency = new Currency();
  }

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((data) => {
      this.currencies = data;
      this.selectedCurrency = this.currencies.find(item => item.Cur_ID === 298);
    });

  }
}
