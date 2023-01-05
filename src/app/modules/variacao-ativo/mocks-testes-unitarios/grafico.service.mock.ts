import { Injectable } from '@angular/core';
import { opcoesVariacoesAtivo } from '../components/grafico/enums/opcoes-variacoes.enum';

@Injectable()
export class GraficoServiceMock {
  constructor() {}

  inicializaServicoGrafico() {}
  destroiChart() {}
  montaGraficoValorAbertura(opcao: opcoesVariacoesAtivo) {}
}
