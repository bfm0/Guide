import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-variacao-ativo',
  templateUrl: './tabela-variacao-ativo.component.html',
  styleUrls: ['./tabela-variacao-ativo.component.scss'],
})
export class TabelaVariacaoAtivoComponent {
  @Input() variacoesAtivo: any;
}
