import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MenusService} from '../../services/menus.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  animations: [
    trigger('inOut', [
      state('out', style({opacity: 0, height: 0})),
      transition('void => *', [
        style({opacity: 0, height: 0}),
        animate(150, style({opacity: 1, height: '*'}))
      ]),
      transition('* => void', [
        style({opacity: 1, height: '*'}),
        animate(150, style({opacity: 0, height: 0}))
      ])
    ])
  ]
})
export class ItemListComponent implements OnInit {
  targetUrl = ''; // 保存目标 URL，即当前 url，通过它来定位当前菜单高亮
  source = [];
  sourceItem = '';
  @Input() menu:any; // 接收父组件传入的值

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _MenusService: MenusService) {
  }

  ngOnInit() {
    this._MenusService.getMenu().then(data => {
      this.source = data;
      this.setCurrentMenu();
    });
  }

  // 展开并设置当前菜单高度
  setCurrentMenu() {
    this.targetUrl = this._router.url; // 获取当前url
    this.targetUrl = this.targetUrl.substr(1, this.targetUrl.length); // 处理获取的 url, 即截掉 url 前的 “ /”
    this.setExpand(this.source);
  }

  setExpand(source) {
    for (var i = 0; i < source.length; i++) {
      this.sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
      if (this.sourceItem.indexOf(this.targetUrl) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
        if (source[i].type === 'button') {
          source[i].isSelected = true;
          source[i].expand = true;
          this.setExpand(source[i].subMenu);
        }
        break;
      }
    }
  }

  putExpand(source) {
    for (var i = 0; i < source.length; i++) {
      this.sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
      if (source[i].type === 'button') {
        source[i].isSelected = false;
        source[i].expand = false;
        this.putExpand(source[i].subMenu);
      }
    }
  }

  toggleSubMenu(menuItem) {
    if (menuItem.type === 'link') {
      this._MenusService.getMenu().then(data => {
        this.source = data;
        this.putExpand(this.source);
        this.setCurrentMenu();
      });

    }

    if (menuItem.type === 'button') {
      menuItem.expand = !menuItem.expand;
    }
  }
}
