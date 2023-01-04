import { Component, Input } from '@angular/core';
import { VariacoesAtivo } from '../../models/variacoes-ativos.model';
import { YahooFinanceService } from '../../services/yahoo-finance.service';

@Component({
  selector: 'app-tabela-variacao-ativo',
  templateUrl: './tabela-variacao-ativo.component.html',
  styleUrls: ['./tabela-variacao-ativo.component.scss'],
})
export class TabelaVariacaoAtivoComponent {
  variacoesAtivo: Array<VariacoesAtivo> = [];
  TEXT_RED = 'text-red-600';
  constructor(private _yahooService: YahooFinanceService) {}

  ngOnInit(): void {
    this.subscreveYahooFinance();
  }

  subscreveYahooFinance() {
    this._yahooService.variacoesAtivo.subscribe(
      (variacoesAtivo: Array<VariacoesAtivo>) => {
        this.variacoesAtivo = variacoesAtivo;
      }
    );
  }

  formataVariacoesNegativas(variacaoAtivo: VariacoesAtivo, variacao: number | null) {
    if (variacao && variacao < 0 && variacaoAtivo.open > 0) {
      return this.TEXT_RED;
    }
    return '';
  }
}
