import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariacaoAtivoRoutingModule } from './variacao-ativo-routing.module';
import { VariacaoAtivoComponent } from './variacao-ativo.component';
import { YahooFinanceModule } from './services/yahoo-finance.module';
import { HeaderVariacaoAtivoModule } from './components/header/header-variacao-ativo.module';
import { TabelaVariacaoAtivoModule } from './components/tabela/tabela-variacao-ativo.module';
import { GraficoVariacaoAtivoModule } from './components/grafico/grafico-variacao-ativo.module';

@NgModule({
  declarations: [VariacaoAtivoComponent],
  imports: [
    CommonModule,
    VariacaoAtivoRoutingModule,
    HeaderVariacaoAtivoModule,
    TabelaVariacaoAtivoModule,
    GraficoVariacaoAtivoModule,
    YahooFinanceModule,
  ],
})
export class VariacaoAtivoModule {}
