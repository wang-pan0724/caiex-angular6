import { Injectable } from '@angular/core';
import jsrsasign from 'jsrsasign'
import CryptoJS from 'crypto-js'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfig } from './app-config'

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" })
  };

  public mustPassParam = {
    "agentId": AppConfig.agentId,
    "sid": AppConfig.sid,
    "version": AppConfig.version,
    "clientType": AppConfig.clientType,
    "appType": AppConfig.appType,
    "imei": AppConfig.imei,
    "phoneModel": AppConfig.phoneModel,
    "macAdrs": AppConfig.macAdrs,
    "format": AppConfig.format,
    "iv": AppConfig.iv
  }

  getLoginPassword(password) {  //RSA
    //创建一个对象
    let rsa = new jsrsasign.RSAKey();
    let publicKey = "-----BEGIN PUBLIC KEY-----\n" + localStorage.getItem('secretkey') + "\n-----END PUBLIC KEY-----";
    rsa = jsrsasign.KEYUTIL.getKey(publicKey)
    var enc = jsrsasign.KJUR.crypto.Cipher.encrypt(password, rsa);
    let loginPassword = jsrsasign.hextob64(enc);
    return loginPassword;
  }

  processJson(obj) {
    let arr = [];
    for (var key in obj) {
      arr.push(key)
    }
    arr.sort();
    let str = "";
    for (var key in arr) {
      str += arr[key] + '=' + obj[arr[key]] + '&'
    }

    str = str.substr(0, str.length - 1);
    // console.log(str);
    return str;
  }

  //SHA1加密
  getSign(value) {
    var key = "GBSJSNKKM@hsdjdkmmkklcld"
    var sha1_result = CryptoJS.HmacSHA1(value, key).toString(CryptoJS.enc.Hex);
    var wordArray = CryptoJS.enc.Utf8.parse(sha1_result);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    // console.log(base64)
    return base64;
  }

  getsecretkey() {
    let nowTime = new Date().getTime();
    localStorage.timeTag = nowTime.toString();
    localStorage.token = (nowTime + 3600000).toString();
    let data = {
      "timeTag": localStorage.getItem("timeTag"),
      "token": localStorage.getItem('token')
    }

    var jsonToStr = this.doJson(data)
    this.http.post('/api/m/support/secretkey.do?' + jsonToStr, this.httpOptions).subscribe(res => {
      localStorage.secretkey = res['key'];
    });
  }

  doJson(json) {
    json = Object.assign(json, this.mustPassParam);
    // json = json.assign(this.mustPassParam);
    var str = this.processJson(json);
    var sign = this.getSign(str);
    str += "&sign=" + sign;
    return str
  }

  getStrUrl(json) {
    var staticJson = {
      "agentId": AppConfig.agentId,
      "sid": AppConfig.sid,
      "version": AppConfig.version,
      "clientType": AppConfig.clientType,
      "appType": AppConfig.appType,
      "imei": AppConfig.imei,
      "phoneModel": AppConfig.phoneModel,
      "macAdrs": AppConfig.macAdrs,
      "format": AppConfig.format,
      "iv": AppConfig.iv,
      "timeTag": localStorage.getItem("timeTag"),
      "token": localStorage.getItem('token'),
    }

    staticJson = Object.assign(json, staticJson, AppConfig.DeviceToken);
    var str = this.processJson(staticJson);
    var sign = this.getSign(str);
    str += "&sign=" + sign;
    return str;
  }
}
