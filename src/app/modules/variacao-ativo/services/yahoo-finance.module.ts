import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YahooFinanceService } from './yahoo-finance.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [YahooFinanceService],
})
export class YahooFinanceModule {}
