import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico-variacao-ativo',
  templateUrl: './grafico-variacao-ativo.component.html',
  styleUrls: ['./grafico-variacao-ativo.component.scss'],
})
export class GraficoVariacaoAtivoComponent implements OnInit {
  @Input() variacoesAtivo: any = new Array(1);

  ngOnInit(): void {
    this.montaGraficoValorAbertura();
  }

  montaGraficoValorAbertura() {
    new Chart('meuCanvas', {
      type: 'line',
      data: {
        labels: this.variacoesAtivo,
        datasets: [
          {
            label: 'Valor de Abertura',
            data: [1],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
