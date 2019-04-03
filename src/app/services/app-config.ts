import { HttpClient, HttpHeaders } from "@angular/common/http";
export class AppConfig {
  static baseUrl: string = 'https://192.168.1.139';
  // "target": "https://app.caieturn.com",
  static agentId: number = 1025;
  static sid: string = '';
  static version: string = 'repo_android_1.0.0';
  static clientType: string = '1';
  static imei: string = '860758044968719';
  static appType: string = '21';
  static token: string = '1549939296751';
  static iv: string = '2';
  static format: string = 'json';
  static sign: string = 'fYbGoSa3vQ1NBLmSaLRGwQ0xy0o%3D';
  static phoneModel: string = 'h5';
  static macAdrs: string = "02%3A00%3A00%3A00%3A00%3A00";
  static DeviceToken: any = {
    "xgDeviceToken": "38ab50020688478645f0aec582ceea6b3c71ea59",
    "miDeviceToken": null,
    "hwDeviceToken": ""
  };
  static httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*" })
  };
}

