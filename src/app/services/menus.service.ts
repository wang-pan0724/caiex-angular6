import { Injectable } from '@angular/core';
import { MENUS } from './menus-mock';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() { }

  getMenu(): Promise<any[]> {
    return Promise.resolve(MENUS);
  }
}
