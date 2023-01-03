import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'variacao-ativo',
    loadChildren: () =>
      import('./modules/variacao-ativo/variacao-ativo.module').then(
        (m) => m.VariacaoAtivoModule
      ),
  },
  { path: '', redirectTo: '/variacao-ativo', pathMatch: 'full' },
  { path: '**', redirectTo: '/variacao-ativo', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
