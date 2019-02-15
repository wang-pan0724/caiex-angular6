import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-next',
  templateUrl: './footer-next.component.html',
  styleUrls: ['./footer-next.component.css']
})
export class FooterNextComponent implements OnInit {

  @Input() selectData:any;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  nextStep(){
    console.log("nextStep.....")
    console.log(this.selectData)
    this.router.navigate(['/detail']);
  }
}
