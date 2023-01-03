import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariacaoAtivoComponent } from './variacao-ativo.component';

const routes: Routes = [
  {
    path: '',
    component: VariacaoAtivoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VariacaoAtivoRoutingModule {}
