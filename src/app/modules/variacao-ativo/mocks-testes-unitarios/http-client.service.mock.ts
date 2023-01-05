import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { opcoesVariacoesAtivo } from '../components/grafico/enums/opcoes-variacoes.enum';

@Injectable()
export class HttpClientMock {
  constructor() {}

  get(path: string) {
    return of();
  }
}
