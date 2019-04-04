import { Component, OnInit } from '@angular/core';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-mystore',
  templateUrl: './mystore.component.html',
  styleUrls: ['./mystore.component.css']
})
export class MystoreComponent implements OnInit {
  public title = "我的彩店";
  public isWeiXin = true;
  public changeNewStore = false;
  public DataList:any = [];
  constructor(private signService: SignService, private http: HttpClient) { }

  ngOnInit() {
    this.isWeiXin = this.isWeiXinFun();

    this.getData()
  }

  getData(){
    
    let data = {
      'realTimeQuery':true
    }

    var that = this;
    this.http.get('/api/m/consumer/providerInfo.do?' + this.signService.getStrUrl(data)).subscribe(response => {
      console.log(response)
     that.DataList = response['resp'];
    });
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
