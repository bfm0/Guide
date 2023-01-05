import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoService } from './grafico.service';
import { YahooFinanceModule } from '../../../services/yahoo-finance.module';

@NgModule({
  imports: [CommonModule, YahooFinanceModule],
  providers: [GraficoService],
})
export class GraficoServiceModule {}
