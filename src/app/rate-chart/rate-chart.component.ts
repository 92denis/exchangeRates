import { Component, OnInit, Input } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Rate } from '../rate';
import { Currency } from '../currency';

@Component({
  selector: 'rate-chart',
  templateUrl: './rate-chart.component.html',
  styleUrls: ['./rate-chart.component.css']
})
export class RateChartComponent implements OnInit {

  @Input() start: Date;
  @Input() end: Date;
  @Input() currensiesId: number[] = [];
  rates: Rate[] = [];
  public dates: string[] = [];

  public lineChartData: Array<any> = [];
  
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
  @Input() public lineChartType: string;

  constructor(private currencyService: CurrencyService) { }

  getCurrency(curId: number, index: number, curName: string) {
    this.currencyService.getRate(curId, this.start, this.end).subscribe((data) => {
      this.rates = data;
      this.dates = this.rates.map(x => x.Date);
      this.lineChartData[index] = { data: this.rates.map(x => x.Cur_OfficialRate), label: curName };

    });
  }

  ngOnInit() {
    this.lineChartData.pop();
    for (let i = 0; i < this.currensiesId.length; i++) {
      this.lineChartData.push({ data: [], label: undefined });
      this.getCurrency(this.currensiesId[i], i, "USD");
    }
  }
}
