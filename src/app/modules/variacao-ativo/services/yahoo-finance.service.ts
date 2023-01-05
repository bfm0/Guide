import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { VariacoesAtivo } from '../models/variacoes-ativos.model';

@Injectable({
  providedIn: 'root',
})
export class YahooFinanceService {
  variacoesAtivo: Subject<Array<VariacoesAtivo>> = new Subject<
    Array<VariacoesAtivo>
  >();
  private QTD_ULTIMOS_PREGOES: number = 30;

  constructor(private httpClient: HttpClient) {}

  setVariacoesAtivo(siglaAtivo: string): void {
    this.httpClient
      .get('/api/v8/finance/chart/GOLL4.SA')
      .subscribe((variacoesAtivo) => {
        this.getTrintaUltimosPregoes(variacoesAtivo);
      });
  }

  getTrintaUltimosPregoes(variacoesAtivo: any): void {
    const resultadoPregoes = variacoesAtivo?.chart?.result;
    const timestaps: Array<Date> = resultadoPregoes[0].timestamp;
    const aberturas = resultadoPregoes[0].indicators?.quote[0].open;
    const timestapsUltimosPregoes: Array<Date> =
      this.extraiUltimosDadosPregoes(timestaps);
    const aberturasUltimosPregoes: Array<number> =
      this.extraiUltimosDadosPregoes(aberturas);

    if (!aberturasUltimosPregoes || aberturasUltimosPregoes.length < 2) {
      throw 'Sem valores de abertura dos últimos pregões';
    }

    const variacoesAtivoUltimosPregoes: Array<VariacoesAtivo> =
      this.montaVariacoesAtivoUltimosPregoes(
        aberturasUltimosPregoes,
        timestapsUltimosPregoes
      );

    this.variacoesAtivo.next(variacoesAtivoUltimosPregoes);
  }

  montaVariacoesAtivoUltimosPregoes(
    aberturasUltimosPregoes: Array<number>,
    timestapsUltimosPregoes: Array<Date>
  ): Array<VariacoesAtivo> {
    const variacoesAtivoUltimosPregoes: Array<VariacoesAtivo> = [];
    const primeiraAbertura: number = aberturasUltimosPregoes[0];

    for (var i = 1; i < aberturasUltimosPregoes.length; i++) {
      const openAtual: number | null = aberturasUltimosPregoes[i];
      const openAnterior: number | null = aberturasUltimosPregoes[i - 1];

      const variacaoPrimeiraData: number | null = this.calculaVariacoes(
        openAtual,
        primeiraAbertura
      );
      const variacaoD1: number | null = this.calculaVariacoes(
        openAtual,
        openAnterior
      );

      const timestamp: Date = timestapsUltimosPregoes[i];

      variacoesAtivoUltimosPregoes.push({
        timestamp: timestamp,
        open: openAtual,
        variacaoD1: variacaoD1,
        variacaoPrimeiraData: variacaoPrimeiraData,
      });
    }
    return variacoesAtivoUltimosPregoes.slice();
  }

  calculaVariacoes(
    aberturaAtual: number,
    aberturaReferencia: number
  ): number | null {
    return aberturaAtual && aberturaReferencia
      ? (aberturaAtual - aberturaReferencia) / aberturaReferencia
      : null;
  }

  extraiUltimosDadosPregoes(dadosPregao: any) {
    return dadosPregao.slice(-(this.QTD_ULTIMOS_PREGOES + 1));
  }
}
