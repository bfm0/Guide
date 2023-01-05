import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoVariacaoAtivoComponent } from './grafico-variacao-ativo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficoServiceModule } from './services/grafico-service.module';

@NgModule({
  declarations: [GraficoVariacaoAtivoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GraficoServiceModule],
  exports: [GraficoVariacaoAtivoComponent],
})
export class GraficoVariacaoAtivoModule {}
