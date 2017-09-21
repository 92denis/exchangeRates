import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';
import { Currency } from './currency'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  currencies = ["USD", "EUR", "RUR"];
  currenciesData: Currency[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.currencyService.getData().subscribe((data) => this.currenciesData = data.json());
    console.log();
  }
}
