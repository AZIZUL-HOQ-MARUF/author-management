import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorListItemComponent } from './components/author-list-item/author-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthorListItemComponent],
  exports: [AuthorListItemComponent]
})
export class SharedModule { }
