import { Component } from '@angular/core';
import { YahooFinanceService } from './services/yahoo-finance.service';

@Component({
  selector: 'app-variacao-ativo',
  templateUrl: './variacao-ativo.component.html',
  styleUrls: ['./variacao-ativo.component.scss'],
})
export class VariacaoAtivoComponent {
  GOLL4: string = 'GOLL4';
  variacoesAtivo: Array<any> = [];

  constructor(private _yahooFinanceService: YahooFinanceService) {}

  ngOnInit(): void {
    this._yahooFinanceService.getVariacoesAtivo(this.GOLL4);
  }
}
