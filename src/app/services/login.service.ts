import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignService } from "./sign.service"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private signService:SignService) { }
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" })
  };
  
  getData() {
    //start.do
    this.http.get('/api/m/support/start.do?'+ this.signService.getStrUrl({}), this.httpOptions).subscribe(response => {
      localStorage.rmStr = response['resp']['rmStr'];
    });

    var password = this.signService.getLoginPassword("123456");
    let timestamp = (Math.random.toString().replace('0.',"")+"000000").substring(0,6) + localStorage.getItem("timeTag");

    let data = {
      "account":"18829290346",
      "password":password,
      "phone":"18829290346",
      "daum":localStorage.getItem('daum'),
      "timestamp":timestamp
    }

    this.http.post('/api/m/consumer/login.do?'+ this.signService.getStrUrl(data), this.httpOptions).subscribe(response => {
      console.log(response);
    });
  }

}
