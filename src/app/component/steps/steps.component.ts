import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  @Input() stepsData:any;
  @Input() active:string;
  constructor() { }

  ngOnInit() {
    console.log(!!!this.active)
    if(!!!this.active){
      this.active="1";
    }
  }

}
