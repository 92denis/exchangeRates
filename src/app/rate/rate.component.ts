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
  public dates: string[] = [];

  public lineChartData: Array<any> = [
    { data: [], label: undefined },
  ];
  // lineChart

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private currencyService: CurrencyService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en');

  }

  typesOfChart: Array<any> = [
    { type: "line", name: "Линейный" },
    { type: "bar", name: "Столбцы" }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (!this.currency || !this.startDate || !this.endDate) {
      return;
    }
    this.currencyService.getRate(this.currency.Cur_ID, this.startDate, this.endDate).subscribe((data) => {
      this.rates = data;

      this.dates = this.rates.map(rate => rate.Date);

      this.lineChartData[0] =
        { data: this.rates.map(x => x.Cur_OfficialRate), label: this.currency.Cur_Name };
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

