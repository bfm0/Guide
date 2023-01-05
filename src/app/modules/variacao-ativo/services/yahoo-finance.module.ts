import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { YahooFinanceService } from './yahoo-finance.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [YahooFinanceService],
})
export class YahooFinanceModule {}
