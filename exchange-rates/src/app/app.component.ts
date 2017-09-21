import { Component } from '@angular/core';
import { CurrencyService} from './currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currencies = ["USD","EUR","RUR"];

  constructor(private currencyService: CurrencyService){}
  
 ngOnInit(){
      
   
 }
}
