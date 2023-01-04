import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { distinctUntilChanged, Subscription } from 'rxjs';
import Chart, { ChartConfiguration, TooltipItem } from 'chart.js/auto';
import { VariacoesAtivo } from '../../models/variacoes-ativos.model';
import { YahooFinanceService } from '../../services/yahoo-finance.service';
import { opcoesVariacoesAtivo } from './enums/opcoes-variacoes.enum';

@Component({
  selector: 'app-grafico-variacao-ativo',
  templateUrl: './grafico-variacao-ativo.component.html',
  styleUrls: ['./grafico-variacao-ativo.component.scss'],
})
export class GraficoVariacaoAtivoComponent implements OnInit, OnDestroy {
  opcoesVariacoesAtivo = opcoesVariacoesAtivo;
  opcaoSelecionadaVariacoesAtivo = opcoesVariacoesAtivo.OPEN;
  formGroupGrafico: FormGroup = new FormGroup({});
  variacoesAtivo: Array<VariacoesAtivo> = [];
  aberturas: Array<number> = [];
  variacoesD1: Array<number | null> = [];
  variacoesPrimeiraData: Array<number | null> = [];
  timestamps: Array<string | null> = [];
  chart: Chart = new Chart('', {} as ChartConfiguration);

  controlValueChangesSubscription: Subscription = new Subscription();
  yahooFinanceSubscription: Subscription = new Subscription();

  constructor(
    private _yahooService: YahooFinanceService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.montaFormGroupGrafico();
    this.subscreveMudancasFormGroup();
    this.subscreveYahooFinance();
    this.ouveResizeDaTela();
  }

  ouveResizeDaTela() {
    /*Este método é necessário para corrigir um bug da biblioteca Chart.js
    //Sem esse método, dimunior o tamanho da tela diminui, permanentemente,
    o tamanho do gráfico. */
    window.addEventListener('resize', () => {
      this.destroiChart();
      this.montaGraficoValorAbertura(this.opcaoSelecionadaVariacoesAtivo);
    });
  }

  montaFormGroupGrafico() {
    this.formGroupGrafico = this._formBuilder.group({
      opcoesVariacaoAtivo: [this.opcaoSelecionadaVariacoesAtivo, []],
    });
  }

  subscreveMudancasFormGroup() {
    const controls = this.formGroupGrafico.controls;
    const opcoesVariacaoAtivo: AbstractControl =
      controls['opcoesVariacaoAtivo'];
    this.controlValueChangesSubscription = opcoesVariacaoAtivo.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((opcao: opcoesVariacoesAtivo) => {
        this.destroiChart();
        this.montaGraficoValorAbertura(opcao);
      });
  }

  subscreveYahooFinance() {
    this.yahooFinanceSubscription = this._yahooService.variacoesAtivo.subscribe(
      (variacoesAtivo: Array<VariacoesAtivo>) => {
        this.variacoesAtivo = variacoesAtivo.slice();
        this.atualizaDatasetsParaGrafico();
        this.destroiChart();
        this.montaGraficoValorAbertura();
      }
    );
  }

  atualizaDatasetsParaGrafico() {
    const datePipe = new DatePipe('pt-BR');
    this.timestamps = this.variacoesAtivo.map((variacao) =>
      datePipe.transform(variacao.timestamp, 'dd/MM/yyyy')
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
    this.chart = new Chart('meuCanvas', {
      type: 'line',
      data: {
        labels: this.timestamps,
        datasets: [
          {
            label: 'Valor de Abertura',
            data: datasetSeletionado,
            borderWidth: 2,
            borderColor: 'rgb(20 83 45)',
            backgroundColor: 'rgb(20 83 45)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: (value) =>
                opcaoVariacaoAtivo === this.opcoesVariacoesAtivo.OPEN
                  ? `R$ ${value}`
                  : `${value}%`,
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

  obtemDatasetSelecionado(opcaoVariacaoAtivo: opcoesVariacoesAtivo) {
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
  ) {
    const decimalPipe = new DecimalPipe('pt-BR');
    const percentPipe = new PercentPipe('pt-BR');

    const index = tooltipItems.dataIndex;
    let data: number = tooltipItems.dataset.data[index] as number;
    if (opcaoVariacaoAtivo === this.opcoesVariacoesAtivo.OPEN) {
      return ('R$' + decimalPipe.transform(data)) as string;
    }
    return percentPipe.transform(data, '1.2-2') as string;
  }

  destroiChart() {
    this.chart.destroy();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => {
      this.destroiChart();
      this.montaGraficoValorAbertura(this.opcaoSelecionadaVariacoesAtivo);
    });

    this.controlValueChangesSubscription.unsubscribe();
    this.yahooFinanceSubscription.unsubscribe();
  }
}
