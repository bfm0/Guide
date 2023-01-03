import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsVariacaoAtivoComponent } from './tabs-variacao-ativo.component';
import { TabelaVariacaoAtivoModule } from './tabela/tabela-variacao-ativo.module';
import { GraficoVariacaoAtivoModule } from './grafico/grafico-variacao-ativo.module';

@NgModule({
  declarations: [TabsVariacaoAtivoComponent],
  imports: [
    CommonModule,
    TabelaVariacaoAtivoModule,
    GraficoVariacaoAtivoModule,
  ],
  exports: [TabsVariacaoAtivoComponent],
})
export class TabsVariacaoAtivoModule {}
