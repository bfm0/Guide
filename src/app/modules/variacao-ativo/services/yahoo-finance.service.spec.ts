import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientMock } from '../mocks-testes-unitarios/http-client.service.mock';
import { YahooFinanceModule } from './yahoo-finance.module';

import { YahooFinanceService } from './yahoo-finance.service';

describe('YahooFinanceService', () => {
  let service: YahooFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [YahooFinanceModule],
      providers: [{ provide: HttpClient, useClass: HttpClientMock }],
    });
    service = TestBed.inject(YahooFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    service.setVariacoesAtivo('');
    expect(service).toBeTruthy();
  });

  it('should get last open values', () => {
    const variacoes = {
      chart: {
        result: [
          {
            timestamp: [new Date()],
            indicators: { quote: [{ open: [1, 2, 3, 4] }] },
          },
        ],
      },
    };
    service.getTrintaUltimosPregoes(variacoes);
    expect(service).toBeTruthy();
  });
});
