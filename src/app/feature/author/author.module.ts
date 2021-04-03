import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from '../author/components/author/author.component';
import { AuthorRoutingModule } from './author.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FavtAuthorComponent } from './components/favt-author/favt-author.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule
  ],
  declarations: [AuthorComponent, FavtAuthorComponent]
})
export class AuthorModule { }
