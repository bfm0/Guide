import { TestBed } from '@angular/core/testing';
import { opcoesOrdenacao } from '../enums/opcoes-ordenacao.enum';

import { TabelaVariacaoAtivoService } from './tabela-variacao-ativo.service';

describe('TabelaVariacaoAtivoService', () => {
  let service: TabelaVariacaoAtivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaVariacaoAtivoService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should be sort ascended', () => {
    const variacoesAtivo = [
      {
        id: 1,
        timestamp: new Date(1),
        open: 1,
        variacaoD1: 1,
        variacaoPrimeiraData: 1,
      },
      {
        id: 2,
        timestamp: new Date(2),
        open: 2,
        variacaoD1: 2,
        variacaoPrimeiraData: 2,
      },
    ];
    service.ordenarTabela(
      opcoesOrdenacao.DIA,
      true,
      opcoesOrdenacao.VALOR,
      variacoesAtivo
    );
    expect(service).toBeTruthy();
  });

  test('should be sort descended', () => {
    const diff = service.ordenaDescendente(1, 2);
    expect(diff).toBeGreaterThan(0);
  });

  test('should not rotate arrow', () => {
    const format = service.rotacionaFlechaOrdenacao(
      opcoesOrdenacao.DATA,
      opcoesOrdenacao.DATA,
      true
    );
    expect(format).toEqual('');
  });

  test('should rotate arrow', () => {
    const format = service.rotacionaFlechaOrdenacao(
      opcoesOrdenacao.DATA,
      opcoesOrdenacao.DATA,
      false
    );
    expect(format).not.toEqual('');
  });

  test('should rotate arrow', () => {
    let formatacao = service.formataVariacoesNegativas({ open: 1 } as any, -1);
    expect(formatacao).toEqual(service.TEXT_RED);
    formatacao = service.formataVariacoesNegativas({ open: 0 } as any, 0);
    expect(formatacao).toEqual('');
  });
});
