import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-how-to-issue-orders',
  templateUrl: './how-to-issue-orders.component.html',
  styleUrls: ['./how-to-issue-orders.component.css']
})
export class HowToIssueOrdersComponent implements OnInit {

  title="如何发单"
  menus = [];

  constructor(
    private _menusService: MenusService
  ) { }
  ngOnInit() {
    this._menusService.getMenu().then(data => {
      this.menus = data;
    });
  }

}
