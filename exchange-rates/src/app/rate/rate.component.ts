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
  @Input() startDate: Date;
  @Input() endDate: Date;
  rates: Rate[] = [];
  changeStartDate: Date;
  changeEndDate: Date;
  public OfficialRate: number[] = [];
  public dates: string[] = [];
  public lineChartData: Array<any> = [
    { data: [], label: undefined },
  ];

  constructor(private currencyService: CurrencyService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en');
    this.startDate = new Date();
    this.endDate = new Date();
    console.log('create RateComponent');
    console.log(this.lineChartData);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeStartDate = changes.startDate.currentValue;
    this.changeEndDate = changes.EndDate.currentValue;
    let start = this.changeStartDate.getFullYear() + '-' + (this.changeStartDate.getMonth() + 1) + '-' + this.changeStartDate.getDate();
    let end = this.changeEndDate.getFullYear() + '-' + (this.changeEndDate.getMonth() + 1) + '-' + this.changeEndDate.getDate();
    this.cur = changes.CurId.currentValue;
    this.currencyService.getRate(this.cur, start, end).subscribe((data) => {
      this.rates = data.json();
      this.dates = this.rates.map(x => x.Date.toString());
      this.OfficialRate = this.rates.map(x => x.Cur_OfficialRate);
      this.lineChartData[0] =
        { data: this.OfficialRate, label: 'Курс' };

      console.log('RateComponent subscribe');
      console.log(this.lineChartData);
    });
    console.log('RateComponent ngOnChanges');
    console.log(this.lineChartData);
    console.log(this.changeStartDate);
  }

  ngOnInit() {
  }
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
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

