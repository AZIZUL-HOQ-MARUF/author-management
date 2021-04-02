import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { AuthorRoutingModule } from './author.routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule
  ],
  declarations: [AuthorComponent]
})
export class AuthorModule { }
