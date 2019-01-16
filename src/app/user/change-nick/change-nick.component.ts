import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-nick',
  templateUrl: './change-nick.component.html',
  styleUrls: ['./change-nick.component.css']
})
export class ChangeNickComponent implements OnInit {
  title = "修改昵称";
  haveText = false;
  constructor() { }

  ngOnInit() {
  }

  mouseenter(){
    console.log("mouseenter....")
  }

  mousedown(){
    console.log("mousedown....");
  }

}
