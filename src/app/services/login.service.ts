import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" })
    };

    let nowTime = new Date().getTime();
    const data = {
      'agentId':AppConfig.agentId,
      'version':AppConfig.version,
      'clientType':AppConfig.clientType,
      'imei':AppConfig.imei,
      'appType':AppConfig.appType,
      'token':nowTime,
      'format':AppConfig.format,
      'timeTag':nowTime,
      'macAdrs':'02%3A00%3A00%3A00%3A00%3A00',
      'phoneModel':'Xiaomi_MI%2F8_9',
      'iv':AppConfig.iv,
      'sign':AppConfig.sign
    }
    this.http.post('api/m/support/secretkey.do',data, httpOptions).subscribe(response => {
      console.log(response);
    });
  }
}
