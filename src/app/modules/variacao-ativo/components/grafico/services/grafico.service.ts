import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import Chart, { ChartConfiguration, TooltipItem } from 'chart.js/auto';

import { opcoesVariacoesAtivo } from '../enums/opcoes-variacoes.enum';
import { VariacoesAtivo } from '../../../models/variacoes-ativos.model';
import { take } from 'rxjs';
import { YahooFinanceService } from '../../../services/yahoo-finance.service';
import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GraficoService {
  opcoesVariacoesAtivo = opcoesVariacoesAtivo;
  opcaoSelecionadaVariacoesAtivo = opcoesVariacoesAtivo.OPEN;
  formGroupGrafico: FormGroup = new FormGroup({});
  variacoesAtivo: Array<VariacoesAtivo> = [];
  aberturas: Array<number> = [];
  variacoesD1: Array<number | null> = [];
  variacoesPrimeiraData: Array<number | null> = [];
  timestamps: Array<string | null> = [];
  chart: Chart = new Chart('', {} as ChartConfiguration);

  decimalPipe = new DecimalPipe('pt-BR');
  percentPipe = new PercentPipe('pt-BR');
  datePipe = new DatePipe('pt-BR');

  NUMERO_DIGITOS_PIPES = '1.2-2';
  COR_GRAFICO = 'rgb(20 83 45)';

  constructor(private _yahooService: YahooFinanceService) {}

  inicializaServicoGrafico(): void {
    this.subscreveYahooFinance();
    this.ouveResizeDaTela();
  }

  ouveResizeDaTela() {
    /*Este método é necessário para corrigir um bug da biblioteca Chart.js.
    Sem esse método, diminuir o tamanho da tela diminui, permanentemente,
    o tamanho do gráfico. */
    window.addEventListener('resize', () => {
      this.destroiChart();
      this.montaGraficoValorAbertura(this.opcaoSelecionadaVariacoesAtivo);
    });
  }

  subscreveYahooFinance() {
    this._yahooService.variacoesAtivo
      .pipe(take(1))
      .subscribe((variacoesAtivo: Array<VariacoesAtivo>) => {
        this.variacoesAtivo = variacoesAtivo.slice();
        this.atualizaDatasetsParaGrafico();
        this.destroiChart();
        this.montaGraficoValorAbertura();
      });
  }

  atualizaDatasetsParaGrafico() {
    this.timestamps = this.variacoesAtivo.map((variacao) =>
      this.datePipe.transform(variacao.timestamp, 'dd/MM/yyyy')
    );
    this.aberturas = this.variacoesAtivo.map((variacao) => variacao.open);
    this.variacoesD1 = this.variacoesAtivo.map(
      (variacao) => variacao.variacaoD1
    );
    this.variacoesPrimeiraData = this.variacoesAtivo.map(
      (variacao) => variacao.variacaoPrimeiraData
    );
  }

  montaGraficoValorAbertura(
    opcaoVariacaoAtivo: opcoesVariacoesAtivo = opcoesVariacoesAtivo.OPEN
  ) {
    const datasetSeletionado = this.obtemDatasetSelecionado(opcaoVariacaoAtivo);
    this.chart = new Chart('guideChart', {
      type: 'line',
      data: {
        labels: this.timestamps,
        datasets: [
          {
            label: opcaoVariacaoAtivo,
            data: datasetSeletionado,
            borderWidth: 2,
            borderColor: this.COR_GRAFICO,
            backgroundColor: this.COR_GRAFICO,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              callback: (value) =>
                opcaoVariacaoAtivo === this.opcoesVariacoesAtivo.OPEN
                  ? `R$ ${this.decimalPipe.transform(
                      value.valueOf(),
                      this.NUMERO_DIGITOS_PIPES
                    )}`
                  : `${this.percentPipe.transform(
                      value.valueOf(),
                      this.NUMERO_DIGITOS_PIPES
                    )}`,
              precision: 2,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (item) =>
                this.formataLabelGrafico(item, opcaoVariacaoAtivo),
            },
          },
        },
      },
    });
  }

  obtemDatasetSelecionado(
    opcaoVariacaoAtivo: opcoesVariacoesAtivo
  ): Array<number | null> {
    switch (opcaoVariacaoAtivo) {
      case this.opcoesVariacoesAtivo.D1:
        return this.variacoesD1;
      case this.opcoesVariacoesAtivo.PRIMEIRA_DATA:
        return this.variacoesPrimeiraData;
      default:
        return this.aberturas;
    }
  }

  formataLabelGrafico(
    tooltipItems: TooltipItem<'line'>,
    opcaoVariacaoAtivo: opcoesVariacoesAtivo
  ): string {
    const index: number = tooltipItems.dataIndex;
    let data: number = tooltipItems.dataset.data[index] as number;
    if (opcaoVariacaoAtivo === this.opcoesVariacoesAtivo.OPEN) {
      return ('R$ ' + this.decimalPipe.transform(data)) as string;
    }
    return this.percentPipe.transform(
      data,
      this.NUMERO_DIGITOS_PIPES
    ) as string;
  }

  destroiChart(): void {
    this.chart.destroy();
  }
}
