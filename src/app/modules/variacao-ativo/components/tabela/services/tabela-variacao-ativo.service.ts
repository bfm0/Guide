import { Injectable } from '@angular/core';
import { VariacoesAtivo } from '../../../models/variacoes-ativos.model';
import { opcoesOrdenacao } from '../enums/opcoes-ordenacao.enum';

@Injectable({
  providedIn: 'root',
})
export class TabelaVariacaoAtivoService {
  TEXT_RED: string = 'text-red-600';

  constructor() {}

  ordenarTabela(
    colunaAtual: opcoesOrdenacao,
    ordenacaoAscendente: boolean,
    colunaOrdenadaAnteriormente: opcoesOrdenacao | null,
    variacoesAtivoOrdenada: Array<VariacoesAtivo>
  ) {
    ordenacaoAscendente =
      colunaOrdenadaAnteriormente === colunaAtual ? !ordenacaoAscendente : true;
    colunaOrdenadaAnteriormente = colunaAtual;
    let funcaoOrdenacao: Function = () => {};
    funcaoOrdenacao = ordenacaoAscendente
      ? this.ordenaAscendente
      : this.ordenaDescendente;

    variacoesAtivoOrdenada.sort((a: VariacoesAtivo, b: VariacoesAtivo) => {
      const valorAtual = Number(a[colunaAtual]);
      const valorSeguinte = Number(b[colunaAtual]);
      return funcaoOrdenacao(valorAtual, valorSeguinte);
    });

    return { colunaOrdenadaAnteriormente, ordenacaoAscendente };
  }

  ordenaAscendente(valorAtual: number, valorSeguinte: number) {
    return valorAtual - valorSeguinte;
  }

  ordenaDescendente(valorAtual: number, valorSeguinte: number) {
    return valorSeguinte - valorAtual;
  }

  rotacionaFlechaOrdenacao(
    colunaAtual: opcoesOrdenacao,
    colunaOrdenadaAnteriormente: opcoesOrdenacao | null,
    ordenacaoAscendente: boolean
  ) {
    return colunaOrdenadaAnteriormente &&
      colunaOrdenadaAnteriormente === colunaAtual &&
      !ordenacaoAscendente
      ? 'rotate-arrow'
      : '';
  }

  formataVariacoesNegativas(
    variacaoAtivo: VariacoesAtivo,
    variacao: number | null
  ) {
    if (variacao && variacao < 0 && variacaoAtivo.open > 0) {
      return this.TEXT_RED;
    }
    return '';
  }
}
