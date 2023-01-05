import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { distinctUntilChanged, Subscription } from 'rxjs';

import { opcoesVariacoesAtivo } from './enums/opcoes-variacoes.enum';
import { GraficoService } from './services/grafico.service';

@Component({
  selector: 'app-grafico-variacao-ativo',
  templateUrl: './grafico-variacao-ativo.component.html',
  styleUrls: ['./grafico-variacao-ativo.component.scss'],
})
export class GraficoVariacaoAtivoComponent implements OnInit, OnDestroy {
  opcoesVariacoesAtivo = opcoesVariacoesAtivo;
  opcaoSelecionadaVariacoesAtivo = opcoesVariacoesAtivo.OPEN;
  formGroupGrafico: FormGroup = new FormGroup({});
  controlValueChangesSubscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _graficoService: GraficoService
  ) {}

  ngOnInit(): void {
    this._graficoService.inicializaServicoGrafico();
    this.montaFormGroupGrafico();
    this.subscreveMudancasFormGroup();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => {
      this._graficoService.destroiChart();
      this._graficoService.montaGraficoValorAbertura(
        this.opcaoSelecionadaVariacoesAtivo
      );
    });

    this.controlValueChangesSubscription.unsubscribe();
  }

  montaFormGroupGrafico() {
    this.formGroupGrafico = this._formBuilder.group({
      opcoesVariacaoAtivo: [this.opcaoSelecionadaVariacoesAtivo, []],
    });
  }

  subscreveMudancasFormGroup(): void {
    const controls = this.formGroupGrafico.controls;
    const opcoesVariacaoAtivo: AbstractControl =
      controls['opcoesVariacaoAtivo'];
    this.controlValueChangesSubscription = opcoesVariacaoAtivo.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((opcao: opcoesVariacoesAtivo) => {
        this._graficoService.destroiChart();
        this._graficoService.montaGraficoValorAbertura(opcao);
      });
  }
}
