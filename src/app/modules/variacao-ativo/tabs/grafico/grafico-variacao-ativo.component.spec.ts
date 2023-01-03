import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoVariacaoAtivoComponent } from './grafico-variacao-ativo.component';

describe('GraficoVariacaoAtivoComponent', () => {
  let component: GraficoVariacaoAtivoComponent;
  let fixture: ComponentFixture<GraficoVariacaoAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoVariacaoAtivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoVariacaoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
