import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-changezhifubao',
  templateUrl: './changezhifubao.component.html',
  styleUrls: ['./changezhifubao.component.css']
})
export class ChangezhifubaoComponent implements OnInit {
  public title = "添加支付宝账号";
  public showPop: boolean = false;
  public showTips: any = "";
  public payPassword: any = "";
  public showPwdPop:boolean = false;
  public showConfirmPop:boolean = false;
  public alipay = "";
  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getPwd(pwd){
    console.log(pwd)
    this.payPassword = pwd;
    this.checkPayPwd()
  }

  getClosePop(close){
    console.log(close);
    this.payPassword = "";
    this.showPwdPop = close;
  }

  confirm(){
    this.showConfirmPop = false;
    this.router.navigate(['/mine/userinfo/']);
  }

  clearCode(){
    this.alipay = "";
  }

  checkPayPwd() {
    let data = {
      'type': 1,
      'payPassword': this.payPassword
    }
    
    this.http.post('/api/m/consumer/checkPayPwd.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doResponsePwdData(response)
    });
  }


  doResponsePwdData(res){
    this.payPassword = '';
    this.showPwdPop = false;
    if(res.ro.code == '0000'){
      let data = {
        'snsAccountType': 1,
        'alipay': this.alipay
      }
      
      this.http.post('/api/m/consumer/modifySnsAccount.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
        this.modifySnsAccount(response)
        console.log(response)
      });
    }else{
      this.showPopFun(res.ro.msg);
    }       
  }

  modifySnsAccount(res){
    if(res.ro.code == '0000'){
      this.showConfirmPop = true;
    }else{
      this.showPop = true;
      this.showTips = res.ro.msg;
    }
  }

  getData() {
    let data = {
      'type': 3
    }
    this.http.post('/api/m/consumer/queryStatus.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doResponseData(response)
    });
  }

  changeAlipay(){
    if (this.alipay.length < 11) {
      this.showPopFun("请输入正确的支付宝账号");
    }

    this.showPwdPop = true;
  }

  doResponseData(res) {
    if (res.resp.isSetWeixin == 1) {
      this.title = "修改支付宝账号";
      this.alipay = JSON.parse(localStorage.getItem('loginData')).resp.alipay;
    } else {
      this.title = "绑定支付宝账号";
    }
  }

  showPopFun(message) {
    this.showPop = true;
    this.showTips = message;
    var that = this
    window.setTimeout(function () {
      that.showPop = false;
      that.showTips = ""
    }, 2000);
  }

}
