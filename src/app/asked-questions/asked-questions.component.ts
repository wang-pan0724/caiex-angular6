import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service'

@Component({
  selector: 'app-asked-questions',
  templateUrl: './asked-questions.component.html',
  styleUrls: ['./asked-questions.component.css']
})
export class AskedQuestionsComponent implements OnInit {
  title="常见问题";
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
