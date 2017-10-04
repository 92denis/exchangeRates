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
  public usa: number[] = [];
  public rus: number[] = [];
  public euro: number[] = [];
  public OfficialRate: number[] = [];
  public dates: string[] = [];
  public datesRate: string[] = [];
  public lineChartData: Array<any> = [
    { data: [], label: undefined },
  ];
  public lineChar: Array<any> = [
    { data: [], label: undefined },
    { data: [], label: undefined },
    { data: [], label: undefined }
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
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  private start: string;
  private end: string;

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
    this.start = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
    this.end = this.endDate.getFullYear() + '-' + (this.endDate.getMonth() + 1) + '-' + this.endDate.getDate();

    this.currencyService.getRate(this.currency.Cur_ID, this.start, this.end).subscribe((data) => {
      this.rates = data.json();

      for (let i = 1; i < this.rates.length; i++) {
        this.rates[i].delta = +(this.rates[i].Cur_OfficialRate - this.rates[i - 1].Cur_OfficialRate).toFixed(4);
      }

      for (let j = 0; j < this.rates.length; j++) {
        this.rates[j].Date = this.rates[j].Date.substring(0, 10);
      }

      this.dates = this.rates.map(x => x.Date.toString().substring(0, 10));


      this.OfficialRate = this.rates.map(x => x.Cur_OfficialRate);
      this.lineChartData[0] =
        { data: this.OfficialRate, label: this.currency.Cur_Name };
    });
  }

  ngOnInit() {
    this.currencyService.getRate(145, this.start, this.end).subscribe((data) => {
      this.rates = data.json();
      this.datesRate = this.rates.map(x => x.Date.toString().substring(0, 10));
      this.usa = this.rates.map(x => x.Cur_OfficialRate);
      this.lineChar[0] = { data: this.usa, label: 'USA' };

    });
    this.currencyService.getRate(298, this.start, this.end).subscribe((data) => {
      this.rates = data.json();

      this.rus = this.rates.map(x => x.Cur_OfficialRate);
      this.datesRate = this.rates.map(x => x.Date.toString().substring(0, 10));
      this.lineChar[1] =
        { data: this.rus, label: 'RUB' };

    });
    this.currencyService.getRate(292, this.start, this.end).subscribe((data) => {
      this.rates = data.json();
      this.datesRate = this.rates.map(x => x.Date.toString().substring(0, 10));
      this.euro = this.rates.map(x => x.Cur_OfficialRate);
      this.lineChar[2] =
        { data: this.euro, label: 'EUR' };
    });

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

