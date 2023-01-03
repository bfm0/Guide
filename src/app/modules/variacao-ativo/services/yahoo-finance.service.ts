import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YahooFinanceService {
  constructor(private httpClient: HttpClient) {}

  getVariacoesAtivo(siglaAtivo: string) {
    const variacaoAtivo = this.httpClient.get('/api/v8/finance/chart/GOLL4.SA');
    return variacaoAtivo;
  }
}
