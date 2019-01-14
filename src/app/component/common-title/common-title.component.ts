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
  @Input() itemData:any

  public showSelectItem: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  goBack() {
    history.go(-1);
  }

  selectItem(){
    if(this.selectDown==true){
      this.showSelectItem = true;
    }
  }

  selectThis(el){
    this.showSelectItem = false;
    console.log(el)
  }

}
