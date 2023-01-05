import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YahooFinanceServiceMock } from './mocks-testes-unitarios/yahoo.service.mock';
import { YahooFinanceService } from './services/yahoo-finance.service';
import { VariacaoAtivoComponent } from './variacao-ativo.component';
import { VariacaoAtivoModule } from './variacao-ativo.module';

describe('VariacaoAtivoComponent', () => {
  let component: VariacaoAtivoComponent;
  let fixture: ComponentFixture<VariacaoAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VariacaoAtivoComponent],
      providers: [
        { provide: YahooFinanceService, useClass: YahooFinanceServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize component', () => {
    expect(component).toBeTruthy();
  });
});
