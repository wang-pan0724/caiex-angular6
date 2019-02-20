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
import { UserinfoComponent } from './userinfo/userinfo.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangeNickComponent } from './user/change-nick/change-nick.component';
import { ChangePhonenumComponent } from './user/change-phonenum/change-phonenum.component';
import { ChangeWeixinComponent } from './user/change-weixin/change-weixin.component';
import { ChangezhifubaoComponent } from './user/changezhifubao/changezhifubao.component';
import { ChangeQQComponent } from './user/change-qq/change-qq.component';
import { ChangeLoginpasswordComponent } from './user/change-loginpassword/change-loginpassword.component';
import { MystoreComponent }  from './mystore/mystore.component';
import { SetupComponent } from './setup/setup.component';
import { AboutUsComponent } from './setup/about-us/about-us.component';
import { FirmOrderComponent } from './firm-order/firm-order.component';

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
  {path:'home/firmorder',component:FirmOrderComponent},
  {path:'mine/askedquestions',component:AskedQuestionsComponent},
  {path:'mine/userinfo',component:UserinfoComponent},
  {path:'mine/userinfo/changenick',component:ChangeNickComponent},
  {path:'mine/userinfo/changephonenum',component:ChangePhonenumComponent},
  {path:'mine/userinfo/changeweixin',component:ChangeWeixinComponent},
  {path:'mine/userinfo/changeqq',component:ChangeQQComponent},
  {path:'mine/userinfo/changezhifubao',component:ChangezhifubaoComponent},
  {path:'mine/userinfo/changeloginpassword',component:ChangeLoginpasswordComponent},
  {path:'mine/signin',component:SignInComponent},
  {path:'mine/signout',component:SignUpComponent},
  {path:'mine/forgotpassword',component:ForgotPasswordComponent},
  {path:'mine/mystore',component:MystoreComponent},
  {path:'mine/setup',component:SetupComponent},
  {path:'mine/setup/aboutus',component:AboutUsComponent},
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
