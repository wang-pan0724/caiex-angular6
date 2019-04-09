import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('passwordType') passwordType: ElementRef
  public title: string = "手机注册";
  public sendCode: boolean = false;
  public showPop: boolean = false;
  public showTips: any = "";
  public val: any;
  public tel = "";
  public code :any;
  public providerInvite:any;

  constructor(private signService: SignService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  visible(e) {
    if (e.target.className == "iconfont icon-eye-slash") {
      e.target.className = "iconfont icon-eye";
      this.passwordType.nativeElement.type = "text";
    } else {
      e.target.className = "iconfont icon-eye-slash";
      this.passwordType.nativeElement.type = "password"
    }
  }

  handle(e) {
    console.log(e)
    this.val = e;
  }

  submit() {
    if (this.tel.length != 11) {
      this.showPopFun("手机号输入错误")
      return;
    }

    if (this.passwordType.nativeElement.value.length < 6) {
      this.showPopFun("密码输入错误");
      return;
    }

    if(!!!this.code){
      this.showPopFun("验证码输入错误");
      return;
    }

    if(!!!this.providerInvite){
      this.showPopFun("请填写彩店邀请码");
      return;
    }

    if(!this.val){
      this.showPopFun("请同意平台服务协议");
      return;
    }

// this.providerInvite ==== 969636
    this.regeister(this.tel, this.code, this.passwordType.nativeElement.value, this.providerInvite)
  }

  regeister(phone, code, passw, providerInvite) {
    var password = this.signService.getLoginPassword(passw);
    let data = {
      "code": code,
      "password": password,
      "phone": phone,
      "providerInvite": providerInvite
    }

    this.http.post('/api/m/consumer/memberRegiste.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doRegeisterData(response)
    });
  }

  doRegeisterData(res) {
    if (res.ro.code !== '0000') {
      this.showPopFun(res.ro.msg);
    } else {
      localStorage.setItem('sid',res.resp.sessionId);
      localStorage.setItem('loginData',JSON.stringify(res))
      this.router.navigate(['/mine']);
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
