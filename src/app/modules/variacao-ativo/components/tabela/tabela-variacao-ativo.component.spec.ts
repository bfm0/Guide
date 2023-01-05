import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YahooFinanceServiceMock } from '../../mocks-testes-unitarios/yahoo.service.mock';
import { YahooFinanceService } from '../../services/yahoo-finance.service';
import { TabelaVariacaoAtivoComponent } from './tabela-variacao-ativo.component';
import { TabelaVariacaoAtivoModule } from './tabela-variacao-ativo.module';

describe('VariacaoAtivoComponent', () => {
  let component: TabelaVariacaoAtivoComponent;
  let fixture: ComponentFixture<TabelaVariacaoAtivoComponent>;

  let yahooServiceMock: YahooFinanceServiceMock = new YahooFinanceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaVariacaoAtivoModule],
      providers: [{ provide: YahooFinanceService, useValue: yahooServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaVariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to changes in yahoo service', async () => {
    component.ngOnInit();
    await yahooServiceMock.variacoesAtivo.next([]);
    expect(component.variacoesAtivo.length).toEqual(0);
  });

  it('should format opens when different than 0', async () => {
    let formatacao = component.formataVariacoesNegativas({ open: 1 } as any, -1);
    expect(formatacao).toEqual(component.TEXT_RED);
    formatacao = component.formataVariacoesNegativas({ open: 0 } as any, 0);
    expect(formatacao).toEqual('');
  });
});
