import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StructureModule } from '../structure/structure.module';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StructureModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [
    StructureModule,
    AppRoutingModule,
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core Module Has Already been Loaded, Import Core Module only in AppModule');
    }
  }
 }
