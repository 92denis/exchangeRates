import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';
import { DateAdapter } from '@angular/material';


@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  @Input() CurId: number;
  cur: string;
  startDate: Date;
  endDate: Date;
  rates: Rate[] = [];
  constructor(private currencyService: CurrencyService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('nl');
    this.startDate = new Date();
    this.endDate = new Date();

  }

  ngOnChanges(changes: SimpleChanges) {
    let startD = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
    let endD = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + this.endDate.getDate();
    this.cur = changes.CurId.currentValue;
    this.currencyService.getRate(this.cur, startD, endD).subscribe((data) => {
      this.rates = data.json()
    });

  }

  ngOnInit() {
  }
}

