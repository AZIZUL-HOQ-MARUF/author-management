import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../core/services/storage-service.service';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.css']
})
export class AuthorListItemComponent implements OnInit {

  @Input('data') data: any;

  @Output('onAddToFavt') onAddToFavt: EventEmitter<any> = new EventEmitter();

  @Output('onRemoveFavt') onRemoveFavt: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickAddFav() {
    this.data.isFav = true;
    this.onAddToFavt.emit(this.data);
  }

  onClickRemoveFavt() {
    this.data.isFav = false;
    this.onRemoveFavt.emit(this.data);
  }

}
