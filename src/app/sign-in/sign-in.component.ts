import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signIndex = 0;
  public sendCode: boolean = false;
  public seconds;
  public tel = "";
  public password = "";
  public showPop: boolean = false;
  public showTips: any = "";
  public code:any;
  constructor(private signService:SignService,private router: Router,private http: HttpClient) { }

  ngOnInit() {
  }

  goBack() {
    history.go(-1);
  }

  signIn(index) {

    if (index == 0) {
      if (this.tel.length != 11) {
        this.showPopFun("手机号输入错误")
        return;
      }

      if (this.password.length < 6) {
        this.showPopFun("密码输入错误");
        return;
      }

      this.loginUsePassword(this.tel,this.password);
      // console.log(this.loginData)
      // this.doLoginData();
    } else if (index == 1) {
      if (this.tel.length != 11) {
        this.showPopFun("手机号输入错误")
        return;
      }

      console.log(this.code)

      if(!!!this.code){
        this.showPopFun("验证码输入错误");
        return;
      }

      this.loginUseCode(this.tel,this.code)
    }
  }

  doLoginData(res){
    let navigationExtras:NavigationExtras = {
      queryParams:{
        "data":JSON.stringify(res.resp)
      }
    }

    if(res.ro.code !== '0000'){
      this.showPopFun(res.ro.msg);
    }else{
      console.log(res)
      this.router.navigate(['/mine'],navigationExtras);
    }
  }

  loginUsePassword(phone,passw) {
    this.signService.getsecretkey();
    //start.do
    this.http.get('/api/m/support/start.do?'+ this.signService.getStrUrl({}), AppConfig.httpOptions).subscribe(response => {
      console.log(response);
      localStorage.setItem('rmStr',response['resp']['rmStr']);

      var password = this.signService.getLoginPassword(passw);
      let timestamp = (Math.random.toString().replace('0.',"")+"000000").substring(0,6) + localStorage.getItem("timeTag");
  
      let data = {
        "account":phone,
        "password":password,
        "phone":phone,
        "daum":localStorage.getItem('rmStr'),
        "timestamp":timestamp
      }
  
      this.http.post('/api/m/consumer/login.do?'+ this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
        this.doLoginData(response)
      });
    });
  }

  //  /m/consumer/phoneCodeLogin.do

  loginUseCode(phone,code){
    this.signService.getsecretkey();
    //start.do
    this.http.get('/api/m/support/start.do?'+ this.signService.getStrUrl({}), AppConfig.httpOptions).subscribe(response => {
      console.log(response);
      localStorage.setItem('rmStr',response['resp']['rmStr']);

      // var password = this.signService.getLoginPassword(code);
      let timestamp = (Math.random.toString().replace('0.',"")+"000000").substring(0,6) + localStorage.getItem("timeTag");
  
      let data = {
        "code":code,
        "phone":phone,
        "daum":localStorage.getItem('rmStr'),
        "timestamp":timestamp
      }
  
      this.http.post('/api/m/consumer/phoneCodeLogin.do?'+ this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
        console.log(response)
        this.doLoginData(response)
      });
    });
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

  changeTab(index) {
    this.signIndex = index;
  }

  getCode() {
    this.sendCode = true
    this.seconds = 120
    var that = this;
    var timeIn = setInterval(function () {
      that.seconds--
      if (that.seconds <= 0) {
        clearInterval(timeIn)
        that.sendCode = false
      }
    }, 1000);
    // alert('hello')
  }

}
