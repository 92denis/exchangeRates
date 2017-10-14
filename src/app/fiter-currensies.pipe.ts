import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiterCurrensies'
})
export class FiterCurrensiesPipe implements PipeTransform {

  transform(currencies): any {
    return  currencies.filter(current => {
      return new Date(current.Cur_DateEnd) >= new Date();
    });;
  }

}
