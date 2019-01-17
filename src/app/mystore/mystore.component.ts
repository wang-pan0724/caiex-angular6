import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mystore',
  templateUrl: './mystore.component.html',
  styleUrls: ['./mystore.component.css']
})
export class MystoreComponent implements OnInit {
  title = "我的彩店";
  isWeiXin = true;
  changeNewStore = false;
  constructor() { }

  ngOnInit() {
    this.isWeiXin = this.isWeiXinFun();
  }

  // openApp(){
  //   if(this.isWeiXin()){
  //     alert('已经为您打开微信');
  //   }else{
  //     window.location.href = 'weixin://';
  //   }
  // }
  change(){
    this.changeNewStore = true;
  }

  cancle(){
    this.changeNewStore = false;
  }

  submit(newStoreCode){
    console.log(newStoreCode.value);
    this.changeNewStore = false;
  }

  isWeiXinFun(){
    var ua = window.navigator.userAgent.toLowerCase();
    var matchUa = ua.match(/MicroMessenger/i);
    if( matchUa == null){
        return false;
    }else{
        return true;
    }
}
}
