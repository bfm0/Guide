import { Component } from '@angular/core';
import { YahooFinanceService } from '../services/yahoo-finance.service';

@Component({
  selector: 'app-tabs-variacao-ativo',
  templateUrl: './tabs-variacao-ativo.component.html',
  styleUrls: ['./tabs-variacao-ativo.component.scss'],
})
export class TabsVariacaoAtivoComponent {
  GOLL4: string = 'GOLL4';
  variacoesAtivo: Array<any> = [];
  QTD_ULTIMOS_PREGOES: number = 30;

  constructor(private _yahooFinanceService: YahooFinanceService) {}

  ngOnInit(): void {
    this._yahooFinanceService
      .getVariacoesAtivo(this.GOLL4)
      .subscribe((variacoesAtivo) => {
        this.getTrintaUltimosPregoes(variacoesAtivo);
      });
  }

  getTrintaUltimosPregoes(variacoesAtivo: any) {
    const resultadoPregoes = variacoesAtivo?.chart?.result;
    const timestaps = resultadoPregoes[0].timestamp;
    const opens = resultadoPregoes[0].indicators?.quote[0].open;
    const timestapsUltimosPregoes = this.extraiUltimosDadosPregoes(timestaps);
    const opensUltimosPregoes = this.extraiUltimosDadosPregoes(opens);

    const primeiroOpen = opensUltimosPregoes[0];

    if (!opensUltimosPregoes || opensUltimosPregoes.length < 2) {
      throw 'Bad input!';
    }

    for (var i = 1; i < opensUltimosPregoes.length; i++) {
      var openAtual = opensUltimosPregoes[i];
      var openAnterior = opensUltimosPregoes[i - 1];

      let variacaoPrimeiraData: number | null;
      let variacaoD1: number | null;

      variacaoPrimeiraData =
        openAtual && primeiroOpen
          ? (openAtual - primeiroOpen) / primeiroOpen
          : null;
      variacaoD1 = (openAtual - openAnterior) / openAnterior;

      const timestamp = timestapsUltimosPregoes[i];

      this.variacoesAtivo.push({
        timestamp: timestamp,
        open: openAtual,
        variacaoD1: variacaoD1,
        variacaoPrimeiraData: variacaoPrimeiraData,
      });
    }
  }

  extraiUltimosDadosPregoes(dadosPregao: any) {
    return dadosPregao.slice(-(this.QTD_ULTIMOS_PREGOES + 1));
  }

  mudaTabVariacaoAtivo() {}
}
