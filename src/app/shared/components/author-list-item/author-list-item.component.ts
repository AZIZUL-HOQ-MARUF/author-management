import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service.service';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.css']
})
export class AuthorListItemComponent implements OnInit {

  @Input('data') data: any;
  constructor(private storageS: StorageService) { }

  ngOnInit() {
  }

  onClickAddFav() {
    this.storageS.getFromLocalStorage('favAuthors');
  }

}
