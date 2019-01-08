import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ScoreComponent } from './score/score.component';
import { TradeComponent } from './trade/trade.component';
import { MineComponent } from './mine/mine.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScoreComponent,
    TradeComponent,
    MineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
