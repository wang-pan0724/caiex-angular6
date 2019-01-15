import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signIndex = 0;
  sendCode = false;
  constructor() { }

  ngOnInit() {
  }

  goBack() {
    history.go(-1);
  }

  signIn(index){
    this.signIndex = index;
  }

  getCode(){
    alert('hello')
  }

}
