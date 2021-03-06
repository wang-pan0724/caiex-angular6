import { Injectable } from '@angular/core';
import { MENUS } from './help-mock';
import { FOOTBALL } from './football-mock'
import { FOOTBALL2 } from './football2-mock'
import { FOOTBALL3 } from './football3-mock'
import { FOOTBALL4 } from './football4-mock'
import { FOOTBALL5 } from './football5-mock'
import { FootballDetail } from './footballDetali-mock'
import { BASSKETBALL } from './basketball-mock'
import { BASKETBALLDETAILS } from './basketballDetail'
import { BASKET5 } from './basketball5-mock'
import { BASKET3 } from './basketball3-mock'
import { TRADE } from './trade-mock'
import { TRADEDETAILDATA } from './trade-detail-mock'
import { TRADEDETAILDATA2 } from './trade-detail2-mock'
import { TRADEDETAIL3 } from './trade-detail3-mock'

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() { }

  getMenu(): Promise<any[]> {
    return Promise.resolve(MENUS);
  }

  getFootballData():Promise<any>{
    return Promise.resolve(FOOTBALL);
  }

  getFootballData2():Promise<any>{
    return Promise.resolve(FOOTBALL2);
  }

  getFootballData3():Promise<any>{
    return Promise.resolve(FOOTBALL3);
  }

  getFootballData4():Promise<any>{
    return Promise.resolve(FOOTBALL4);
  }

  getFootballData5():Promise<any>{
    return Promise.resolve(FOOTBALL5);
  }

  getFootballDetail():Promise<any>{
    return Promise.resolve(FootballDetail);
  }

  getBassketballData():Promise<any>{
    return Promise.resolve(BASSKETBALL);
  }

  getBassketballData5():Promise<any>{
    return Promise.resolve(BASKET5);
  }

  getBassketballData3():Promise<any>{
    return Promise.resolve(BASKET3);
  }

  getBassketballDetail():Promise<any>{
    return Promise.resolve(BASKETBALLDETAILS);
  }

  getTrade():Promise<any>{
    return Promise.resolve(TRADE)
  }

  getTradeDetail():Promise<any>{
    return Promise.resolve(TRADEDETAILDATA)
  }

  getTradeDetail2():Promise<any>{
    return Promise.resolve(TRADEDETAILDATA2)
  }

  getTradeDetail3():Promise<any>{
    return Promise.resolve(TRADEDETAIL3)
  }
}
