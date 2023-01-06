import { Injectable } from '@angular/core';
import { opcoesOrdenacao } from '../components/tabela/enums/opcoes-ordenacao.enum';
import { VariacoesAtivo } from '../models/variacoes-ativos.model';

@Injectable()
export class TabelaVariacaoAtivoServiceMock {

  ordenarTabela(
    colunaAtual: opcoesOrdenacao,
    ordenacaoAscendente: boolean,
    colunaOrdenadaAnteriormente: opcoesOrdenacao | null,
    variacoesAtivoOrdenada: Array<VariacoesAtivo>
  ) {
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
    return '';
  }

  formataVariacoesNegativas(
    variacaoAtivo: VariacoesAtivo,
    variacao: number | null
  ) {
    return '';
  }
}
