import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariacaoAtivoRoutingModule } from './variacao-ativo-routing.module';
import { VariacaoAtivoComponent } from './variacao-ativo.component';
import { YahooFinanceModule } from './services/yahoo-finance.module';
import { HeaderVariacaoAtivoModule } from './header/header-variacao-ativo.module';
import { TabsVariacaoAtivoModule } from './tabs/tabs-variacao-ativo.module';

@NgModule({
  declarations: [VariacaoAtivoComponent],
  imports: [
    CommonModule,
    VariacaoAtivoRoutingModule,
    HeaderVariacaoAtivoModule,
    TabsVariacaoAtivoModule,
    YahooFinanceModule,
  ],
})
export class VariacaoAtivoModule {}
