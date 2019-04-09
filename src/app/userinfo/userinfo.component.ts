import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from '../services/sign.service'
import { AppConfig } from '../services/app-config';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  title="个人信息";
  imageUrl ="../../assets/country.jpg"
  public userInfo:any = [];
  public isSetUserInfo:any = [];

  constructor(private router: Router,private signService: SignService, private http: HttpClient) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('loginData')).resp
    this.getData()
  }

  getData(){
    let data = {
      'type':3
    }

    this.http.post('/api/m/consumer/queryStatus.do?' + this.signService.getStrUrl(data), AppConfig.httpOptions).subscribe(response => {
      // this.doRegeisterData(response)
      console.log(response)
      this.isSetUserInfo = response['resp']
    });
  }

  successHandle(file: any): void {
    // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file.raw))
    // this.message.info('文件上传成功')
  }
  
  errorHandle(err: any): void {
    // this.message.error('文件上传失败:' + err)
  }

  signOut(){
    window.localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

}
