import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VariacoesAtivo } from '../models/variacoes-ativos.model';

@Injectable({
  providedIn: 'root',
})
export class YahooFinanceService {
  variacoesAtivo = new Subject<Array<VariacoesAtivo>>();
  private QTD_ULTIMOS_PREGOES: number = 30;

  constructor(private httpClient: HttpClient) {}

  getVariacoesAtivo(siglaAtivo: string) {
    this.httpClient
      .get('/api/v8/finance/chart/GOLL4.SA')
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

    const variacoesAtivoUltimosPregoes: Array<VariacoesAtivo> = [];

    for (var i = 1; i < opensUltimosPregoes.length; i++) {
      var openAtual = opensUltimosPregoes[i];
      var openAnterior = opensUltimosPregoes[i - 1];

      let variacaoPrimeiraData: number | null;
      let variacaoD1: number | null;

      variacaoPrimeiraData =
        openAtual && primeiroOpen
          ? (openAtual - primeiroOpen) / primeiroOpen
          : null;

      variacaoD1 =
        openAtual && openAnterior
          ? (openAtual - openAnterior) / openAnterior
          : null;

      const timestamp = timestapsUltimosPregoes[i];

      variacoesAtivoUltimosPregoes.push({
        timestamp: timestamp,
        open: openAtual,
        variacaoD1: variacaoD1,
        variacaoPrimeiraData: variacaoPrimeiraData,
      });
    }

    this.variacoesAtivo.next(variacoesAtivoUltimosPregoes);
  }

  extraiUltimosDadosPregoes(dadosPregao: any) {
    return dadosPregao.slice(-(this.QTD_ULTIMOS_PREGOES + 1));
  }
}
