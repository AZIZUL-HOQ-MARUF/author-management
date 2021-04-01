import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api-service.service';
import { StorageService } from './services/storage-service.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ApiService, StorageService]
})
export class CoreModule { }
