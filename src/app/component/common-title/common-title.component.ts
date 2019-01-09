import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styleUrls: ['./common-title.component.css']
})
export class CommonTitleComponent implements OnInit {

  @Input() showReturn: boolean = false;
  @Input() title: string = '菜菜';

  constructor() { }

  ngOnInit() {
  }

}
