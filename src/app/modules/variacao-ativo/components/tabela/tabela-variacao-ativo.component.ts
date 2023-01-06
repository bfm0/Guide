import { Component } from '@angular/core';

import { VariacoesAtivo } from '../../models/variacoes-ativos.model';
import { YahooFinanceService } from '../../services/yahoo-finance.service';
import { opcoesOrdenacao } from './enums/opcoes-ordenacao.enum';
import { titulosHeader } from './enums/titulos-header.enum';
import { TabelaVariacaoAtivoService } from './services/tabela-variacao-ativo.service';

@Component({
  selector: 'app-tabela-variacao-ativo',
  templateUrl: './tabela-variacao-ativo.component.html',
  styleUrls: ['./tabela-variacao-ativo.component.scss'],
})
export class TabelaVariacaoAtivoComponent {
  variacoesAtivo: Array<VariacoesAtivo> = [];
  variacoesAtivoOrdenada: Array<VariacoesAtivo> = [];
  titulosHeader = titulosHeader;
  opcoesOrdenacao = opcoesOrdenacao;
  colunaOrdenadaAnteriormente: opcoesOrdenacao | null = null;
  ordenacaoAscendente: boolean = true;

  constructor(
    private _yahooService: YahooFinanceService,
    private _tabelaVariacaoAtivoService: TabelaVariacaoAtivoService
  ) {}

  ngOnInit(): void {
    this.subscreveYahooFinance();
  }

  subscreveYahooFinance() {
    this._yahooService.variacoesAtivo.subscribe(
      (variacoesAtivo: Array<VariacoesAtivo>) => {
        this.variacoesAtivo = variacoesAtivo.slice();
        this.variacoesAtivoOrdenada = variacoesAtivo.slice();
      }
    );
  }

  trackByDia(index: number, variacao: VariacoesAtivo) {
    return variacao.id;
  }

  formataVariacoesNegativas(
    variacaoAtivo: VariacoesAtivo,
    variacao: number | null
  ) {
    return this._tabelaVariacaoAtivoService.formataVariacoesNegativas(
      variacaoAtivo,
      variacao
    );
  }

  ordenarTabela(colunaAtual: opcoesOrdenacao) {
    const { colunaOrdenadaAnteriormente, ordenacaoAscendente } =
      this._tabelaVariacaoAtivoService.ordenarTabela(
        colunaAtual,
        this.ordenacaoAscendente,
        this.colunaOrdenadaAnteriormente,
        this.variacoesAtivoOrdenada
      );
    this.colunaOrdenadaAnteriormente = colunaOrdenadaAnteriormente;
    this.ordenacaoAscendente = ordenacaoAscendente;
  }

  rotacionaFlechaOrdenacao(colunaAtual: opcoesOrdenacao) {
    return this._tabelaVariacaoAtivoService.rotacionaFlechaOrdenacao(
      colunaAtual,
      this.colunaOrdenadaAnteriormente,
      this.ordenacaoAscendente
    );
  }
}
