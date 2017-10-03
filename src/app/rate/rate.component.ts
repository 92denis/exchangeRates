import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';
import { Currency } from '../currency';
import { DateAdapter } from '@angular/material';


@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  @Input() currency: Currency;
  @Input() startDate: Date;
  @Input() endDate: Date;

  rates: Rate[] = [];

  public OfficialRate: number[] = [];
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
    let start = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
    let end = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + this.endDate.getDate();
    this.getRates(this.currency.Cur_ID, start, end);
    this.lineChartData[0] =
    { data: this.OfficialRate, label: this.currency.Cur_Name };
  }

  getRates(id, start, end) {
    this.currencyService.getRate(id, start, end).subscribe((data) => {
      this.rates = data.json();

      for (let i = 1; i < this.rates.length; i++) {
        this.rates[i].delta = +(this.rates[i].Cur_OfficialRate - this.rates[i - 1].Cur_OfficialRate).toFixed(4);
      }

      for (let j = 0; j < this.rates.length; j++) {
        this.rates[j].Date = this.rates[j].Date.substring(0, 10);
      }

      this.dates = this.rates.map(x => x.Date.toString().substring(0, 10));


      this.OfficialRate = this.rates.map(x => x.Cur_OfficialRate);
     
        return this.OfficialRate
    });

  }
  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

