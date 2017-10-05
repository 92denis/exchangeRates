import { Component, OnInit, Input } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';

@Component({
  selector: 'rate-chart',
  templateUrl: './rate-chart.component.html',
  styleUrls: ['./rate-chart.component.css']
})
export class RateChartComponent implements OnInit {

  @Input() start: string;
  @Input() end: string;

  public usa: number[] = [];
  public rus: number[] = [];
  public euro: number[] = [];
  rates: Rate[] = [];

  public dates: string[] = [];

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

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getRate(145, this.start, this.end).subscribe((data) => {
      this.rates = data.json();
      this.dates = this.rates.map(x => x.Date.toString().substring(0, 10));
      this.usa = this.rates.map(x => x.Cur_OfficialRate);
      this.lineChar[0] = { data: this.usa, label: 'USA' };

    });
    this.currencyService.getRate(298, this.start, this.end).subscribe((data) => {
      this.rates = data.json();

      this.rus = this.rates.map(x => x.Cur_OfficialRate);
      this.dates = this.rates.map(x => x.Date.toString().substring(0, 10));
      this.lineChar[1] =
        { data: this.rus, label: 'RUB' };

    });
    this.currencyService.getRate(292, this.start, this.end).subscribe((data) => {
      this.rates = data.json();
      this.dates = this.rates.map(x => x.Date.toString().substring(0, 10));
      this.euro = this.rates.map(x => x.Cur_OfficialRate);
      this.lineChar[2] =
        { data: this.euro, label: 'EUR' };
    });
  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
