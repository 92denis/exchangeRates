import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  @Input() CurId: number;
  cur: string;
  startDate: string;
  endDate: string;
  rates: Rate[] = [];
  constructor(private currencyService: CurrencyService) { }

  ngOnChanges(changes: SimpleChanges) {

    this.cur = changes.CurId.currentValue;
    this.currencyService.getRate(this.cur, this.startDate, this.endDate).subscribe((data) => {
      this.rates = data.json()
    });

  }

  ngOnInit() {
  }
}

