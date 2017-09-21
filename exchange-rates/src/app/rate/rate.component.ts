import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  rates: Rate[] = [];
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getRate().subscribe((data) => {
      this.rates = data.json()
    });
  }
}

