import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import { SignService } from '../services/sign.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "首页";

  constructor(public storage: LoginService,private signService:SignService) { }

  ngOnInit() {
    this.storage.getData();
    let arr = {
      "agentId":'1025',
      "version":"repo_android_1.0.0",
      "sid":"",
      "format":"json",
    }
    this.signService.getsecretkey()
  }

  
}
