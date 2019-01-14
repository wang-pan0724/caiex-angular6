import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScoreComponent } from './score/score.component';
import { TradeComponent } from './trade/trade.component';
import { MineComponent } from './mine/mine.component';
import { FootballComponent } from './football/football.component';
import { BasketballComponent } from './basketball/basketball.component';
import { HowToTradeComponent } from './how-to-trade/how-to-trade.component';
import { HowToIssueOrdersComponent } from './how-to-issue-orders/how-to-issue-orders.component';
import { HowToAwardPrizesComponent } from './how-to-award-prizes/how-to-award-prizes.component';
import { AskedQuestionsComponent } from './asked-questions/asked-questions.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'score',component:ScoreComponent},
  {path:'trade',component:TradeComponent},
  {path:'mine',component:MineComponent},
  {path:'home/football',component:FootballComponent},
  {path:'home/basketball',component:BasketballComponent},
  {path:'home/howtoTread',component:HowToTradeComponent},
  {path:'home/howtoissueorders',component:HowToIssueOrdersComponent},
  {path:'home/howtoawardprizes',component:HowToAwardPrizesComponent},
  {path:'mine/askedquestions',component:AskedQuestionsComponent}
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
