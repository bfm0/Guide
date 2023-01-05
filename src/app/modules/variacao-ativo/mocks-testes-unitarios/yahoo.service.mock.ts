import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VariacoesAtivo } from '../models/variacoes-ativos.model';


@Injectable()
export class YahooFinanceServiceMock {
  variacoesAtivo: Subject<Array<VariacoesAtivo>> = new Subject<
  Array<VariacoesAtivo>
>();
  constructor() {}

  setVariacoesAtivo(): void {}

  getTrintaUltimosPregoes(): void {}

  montaVariacoesAtivoUltimosPregoes(): Array<VariacoesAtivo> {
    const variacoesAtivoUltimosPregoes: Array<VariacoesAtivo> = [];
    return variacoesAtivoUltimosPregoes.slice();
  }

  calculaVariacoes(): number | null {
    return 1;
  }

  extraiUltimosDadosPregoes(dadosPregao: any) {
    return dadosPregao.slice();
  }
}
