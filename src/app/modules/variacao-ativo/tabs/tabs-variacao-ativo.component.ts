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

  constructor(private _yahooFinanceService: YahooFinanceService) {}

  ngOnInit(): void {
    this._yahooFinanceService.getVariacoesAtivo(this.GOLL4);
  }
}
