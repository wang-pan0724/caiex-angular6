import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signIndex = 0;
  public sendCode:boolean = false;
  public seconds;
  constructor() { }

  ngOnInit() {
  }

  goBack() {
    history.go(-1);
  }

  signIn(index) {
    this.signIndex = index;
  }

  getCode() {
    alert('hello')
  }

  send() {
    this.sendCode = true
    this.seconds = 60
    var that = this;
    var timeIn = setInterval(function () {
      that.seconds--
      if (that.seconds <= 0) {
        clearInterval(timeIn)
        that.sendCode = false
      }
    }, 1000);
  }

}
