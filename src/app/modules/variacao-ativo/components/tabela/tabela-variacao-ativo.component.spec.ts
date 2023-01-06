import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaVariacaoAtivoServiceMock } from '../../mocks-testes-unitarios/tabela-variacao-ativo.service.mock';
import { YahooFinanceServiceMock } from '../../mocks-testes-unitarios/yahoo.service.mock';
import { YahooFinanceService } from '../../services/yahoo-finance.service';
import { opcoesOrdenacao } from './enums/opcoes-ordenacao.enum';
import { TabelaVariacaoAtivoService } from './services/tabela-variacao-ativo.service';
import { TabelaVariacaoAtivoComponent } from './tabela-variacao-ativo.component';
import { TabelaVariacaoAtivoModule } from './tabela-variacao-ativo.module';

describe('VariacaoAtivoComponent', () => {
  let component: TabelaVariacaoAtivoComponent;
  let fixture: ComponentFixture<TabelaVariacaoAtivoComponent>;

  let yahooServiceMock: YahooFinanceServiceMock = new YahooFinanceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaVariacaoAtivoModule],
      providers: [
        { provide: YahooFinanceService, useValue: yahooServiceMock },
        {
          provide: TabelaVariacaoAtivoService,
          useClass: TabelaVariacaoAtivoServiceMock,
        },
      ],
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

  it('should track by id', async () => {
    const id = component.formataVariacoesNegativas({} as any, 1);
    expect(id).toEqual('');
  });

  it('should format negative values', async () => {
    const formatacao = component.formataVariacoesNegativas({} as any, 1);
    expect(formatacao).toEqual('');
  });

  it('should format arrow icon', async () => {
    const formatacaoArrow = component.rotacionaFlechaOrdenacao(
      opcoesOrdenacao.VALOR
    );
    expect(formatacaoArrow).toEqual('');
  });

  it('should sort table', async () => {
    component.ordenaTabela(opcoesOrdenacao.VALOR);
    expect(component.colunaOrdenadaAnteriormente).toBeDefined();
  });
});
