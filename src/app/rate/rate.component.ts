import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';
import { Currency } from '../currency';
import { DateAdapter } from '@angular/material';


@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent {
  @Input() currency: Currency;
  @Input() startDate: Date;
  @Input() endDate: Date;
  rates: Rate[] = [];
  isMarked = false;
  isChecked = true;
  


  constructor(private currencyService: CurrencyService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en');

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.currency || !this.startDate || !this.endDate) {
      return;
    }
    this.currencyService.getRate(this.currency.Cur_ID, this.startDate, this.endDate).subscribe((data) => {
      this.rates = data;

    });
  }

  multiChart() {
    this.isMarked = true;
    this.isChecked = false;
  }
  lineChart() {
    this.isMarked = false;
    this.isChecked = true;
  }
}

