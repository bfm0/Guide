import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GraficoServiceMock } from '../../mocks-testes-unitarios/grafico.service.mock';

import { GraficoVariacaoAtivoComponent } from './grafico-variacao-ativo.component';
import { GraficoVariacaoAtivoModule } from './grafico-variacao-ativo.module';
import { GraficoService } from './services/grafico.service';

describe('GraficoVariacaoAtivoComponent', () => {
  let component: GraficoVariacaoAtivoComponent;
  let fixture: ComponentFixture<GraficoVariacaoAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoVariacaoAtivoModule, ReactiveFormsModule, FormsModule],
      providers: [{ provide: GraficoService, useClass: GraficoServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoVariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should unsubscribe to observables', () => {
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });

  it('should build chart', () => {
    component.montaFormGroupGrafico();
    expect(component.formGroupGrafico).toBeDefined();
  });

  it('should unsubscribe to observables', async () => {
    const controls = component.formGroupGrafico.controls;
    const opcoesVariacaoAtivo: AbstractControl =
      controls['opcoesVariacaoAtivo'];
    component.subscreveMudancasFormGroup();
    await opcoesVariacaoAtivo.setValue('');
    expect(opcoesVariacaoAtivo).toBeDefined();
  });
});
