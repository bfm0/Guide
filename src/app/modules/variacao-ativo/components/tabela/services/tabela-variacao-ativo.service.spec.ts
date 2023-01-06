import { TestBed } from '@angular/core/testing';

import { TabelaVariacaoAtivoService } from './tabela-variacao-ativo.service';

describe('TabelaVariacaoAtivoService', () => {
  let service: TabelaVariacaoAtivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaVariacaoAtivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
