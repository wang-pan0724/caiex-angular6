import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = "首页"

  constructor(public storage: LoginService) { }

  ngOnInit() {
    this.storage.getData();
  }

}
