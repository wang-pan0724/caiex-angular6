import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router'
import { SignService } from '../../services/sign.service'
import { AppConfig } from '../../services/app-config';
import { HttpClient } from "@angular/common/http";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-change-phonenext',
  templateUrl: './change-phonenext.component.html',
  styleUrls: ['./change-phonenext.component.css']
})
export class ChangePhonenextComponent implements OnInit {
  public sendCode: boolean = false;
  public seconds;
  public tel = "";
  public showPop: boolean = false;
  public showTips: any = "";
  public code:any;
  public certNo:any = "";
  public oldPhone:any = "";
  public title:string = "修改绑定手机号";
  constructor(private signService: SignService, private router: Router, private http: HttpClient,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.oldPhone = params.num;
    })
  }
  // account=null&oldPhone=18829290346&certNo=&newPhone=18829290346&code=123456&step=3

  modifyPhone(number) {
    if (this.tel.length != 11) {
      this.showPopFun("手机号输入错误")
      return;
    }

    if(!!!this.code){
      this.showPopFun("验证码输入错误");
      return;
    }

    let data = {
      "account": null,
      "oldPhone": this.oldPhone,
      "step": 3,
      "newPhone":this.tel,
      "code":this.code,
      "certNo":this.certNo
    }

    this.http.post('/api/m/consumer/modifyPhone.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      this.doResponseData(response)
    });
  }

  doResponseData(res) {
    console.log(res)
    if (res.ro.code == '0000') {
      this.router.navigate(['/mine/userinfo/changephonenext']);
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

  getCode() {
    if(this.tel == ''){
      this.showPopFun("请输入11位手机号")
      return;
    }
    if (this.tel.length != 11 && this.tel != '') {
      this.showPopFun("请输入正确手机号")
      return;
    }
    
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
