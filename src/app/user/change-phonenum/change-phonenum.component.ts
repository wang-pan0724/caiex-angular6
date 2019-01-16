import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-phonenum',
  templateUrl: './change-phonenum.component.html',
  styleUrls: ['./change-phonenum.component.css']
})
export class ChangePhonenumComponent implements OnInit {
  title = "绑定手机号码";
  numberList = ['','','','','','','','','','','',''];
  constructor() { }

  ngOnInit() {
  }

  change(str){
    var number = str.value;

    var reg = /^[0-9]*$ /;
    if(number.length>12 || reg.test(number)){
      return false;
    }
    var arr = number.split('');
    for(var i=0; i<this.numberList.length; i++){
      if(arr[i]){
        this.numberList[i] = arr[i];
      }else{
        this.numberList[i] = '';
      }
      
    }
  }

}
