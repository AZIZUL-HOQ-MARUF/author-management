import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'authors', pathMatch: 'full'
  },
  {
    path: 'authors',
    loadChildren: () => import('./feature/author/author.module').then(m => m.AuthorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
