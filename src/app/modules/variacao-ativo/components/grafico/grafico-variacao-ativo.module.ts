import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { GraficoVariacaoAtivoComponent } from './grafico-variacao-ativo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GraficoVariacaoAtivoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [GraficoVariacaoAtivoComponent],
})
export class GraficoVariacaoAtivoModule {}
