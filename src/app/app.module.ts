import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ElModule } from 'element-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule,HttpClientJsonpModule } from '@angular/common/http';

import {NgxEchartsModule} from 'ngx-echarts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ScoreComponent } from './score/score.component';
import { TradeComponent } from './trade/trade.component';
import { MineComponent } from './mine/mine.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CommonTitleComponent } from './component/common-title/common-title.component';
import { FootballComponent } from './football/football.component';
import { BasketballComponent } from './basketball/basketball.component';
import { FooterComponent } from './component/footer/footer.component';
import { FooterNextComponent } from './component/footer-next/footer-next.component';
import { MatchTitleComponent } from './component/match-title/match-title.component';
import { MatchDetailComponent } from './component/match-detail/match-detail.component';
import { MatchEndtimeComponent } from './component/match-endtime/match-endtime.component';
import { HowToTradeComponent } from './how-to-trade/how-to-trade.component';
import { HowToIssueOrdersComponent } from './how-to-issue-orders/how-to-issue-orders.component';
import { HowToAwardPrizesComponent } from './how-to-award-prizes/how-to-award-prizes.component';
import { ScrollComponent } from './component/scroll/scroll.component';
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
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ChangeLoginpasswordComponent } from './user/change-loginpassword/change-loginpassword.component';
import { MystoreComponent } from './mystore/mystore.component';
import { SetupComponent } from './setup/setup.component';
import { AboutUsComponent } from './setup/about-us/about-us.component';
import { WeekPipe } from './pipe/week.pipe';
import { TimePipe } from './pipe/time.pipe';
import { LeagueResultDescPipe } from './pipe/league-result-desc.pipe';
import { AgainstRecordPipe } from './pipe/against-record.pipe';
import { FirmOrderComponent } from './firm-order/firm-order.component';
import { DealWithDataPipe } from './pipe/deal-with-data.pipe';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';
import { StepsComponent } from './component/steps/steps.component';
import { AlertComponent } from './component/alert/alert.component';
import { ForgotpwdCheckcodeComponent } from './forgotpwd-checkcode/forgotpwd-checkcode.component';
import { AgreementComponent } from './agreement/agreement.component';
import { PhonenumPipe } from './pipe/phonenum.pipe';
import { ChangePhonenextComponent } from './user/change-phonenext/change-phonenext.component';
import { PasswordComponent } from './component/password/password.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScoreComponent,
    TradeComponent,
    MineComponent,
    NavbarComponent,
    CommonTitleComponent,
    FootballComponent,
    BasketballComponent,
    FooterComponent,
    FooterNextComponent,
    MatchTitleComponent,
    MatchDetailComponent,
    MatchEndtimeComponent,
    HowToTradeComponent,
    HowToIssueOrdersComponent,
    HowToAwardPrizesComponent,
    ScrollComponent,
    AskedQuestionsComponent,
    UserinfoComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ChangeNickComponent,
    ChangePhonenumComponent,
    ChangeWeixinComponent,
    ChangezhifubaoComponent,
    ChangeQQComponent,
    ChangePasswordComponent,
    ChangeLoginpasswordComponent,
    MystoreComponent,
    SetupComponent,
    AboutUsComponent,
    WeekPipe,
    TimePipe,
    LeagueResultDescPipe,
    AgainstRecordPipe,
    FirmOrderComponent,
    DealWithDataPipe,
    TradeDetailComponent,
    StepsComponent,
    AlertComponent,
    ForgotpwdCheckcodeComponent,
    AgreementComponent,
    PhonenumPipe,
    ChangePhonenextComponent,
    PasswordComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ElModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    NgxEchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
