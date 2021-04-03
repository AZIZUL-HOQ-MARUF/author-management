import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from '../author/components/author/author.component';
import { FavtAuthorComponent } from './components/favt-author/favt-author.component';


const routes: Routes = [
    { path: '',  redirectTo: 'authors', pathMatch: 'full' },
    { path: 'authors',  component: AuthorComponent },
    { path: 'favt-authors',  component: FavtAuthorComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthorRoutingModule { }