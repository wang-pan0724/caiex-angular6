import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styleUrls: ['./common-title.component.css']
})
export class CommonTitleComponent implements OnInit {

  @Input() showReturn: boolean = false;
  @Input() selectDown: boolean = false;
  @Input() title: string;

  public showSelectItem: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  goBack() {
    history.go(-1);
  }

  selectItem(){
    console.log('dddd')
    if(this.selectDown==true){
      this.showSelectItem = true;
    }
  }

  selectThis(){
    this.showSelectItem = false;
  }

}
