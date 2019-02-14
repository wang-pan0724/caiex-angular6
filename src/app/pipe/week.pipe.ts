import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week'
})
export class WeekPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    return weekArray[new Date(value).getDay()];
  }

}
