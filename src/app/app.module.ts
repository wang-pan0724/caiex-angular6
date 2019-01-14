import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ElModule } from 'element-angular'

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
import { ItemListComponent } from './component/item-list/item-list.component';
import { HowToTradeComponent } from './how-to-trade/how-to-trade.component';
import { HowToIssueOrdersComponent } from './how-to-issue-orders/how-to-issue-orders.component';
import { HowToAwardPrizesComponent } from './how-to-award-prizes/how-to-award-prizes.component';
import { ScrollComponent } from './component/scroll/scroll.component';
import { AskedQuestionsComponent } from './asked-questions/asked-questions.component';

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
    ItemListComponent,
    HowToTradeComponent,
    HowToIssueOrdersComponent,
    HowToAwardPrizesComponent,
    ScrollComponent,
    AskedQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
