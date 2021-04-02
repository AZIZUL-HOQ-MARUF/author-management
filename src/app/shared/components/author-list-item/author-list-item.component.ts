import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service.service';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.css']
})
export class AuthorListItemComponent implements OnInit {

  @Input('data') data: any;

  @Input('isFav') isFav: boolean = false;

  @Output('onAddToFavt') onAddToFavt: EventEmitter<any> = new EventEmitter();

  @Output('onRemoveFavt') onRemoveFavt: EventEmitter<any> = new EventEmitter();

  constructor(private storageS: StorageService) { }

  ngOnInit() {
  }

  onClickAddFav() {
    this.onAddToFavt.emit({ _id: this.data._id });
  }

  onClickRemoveFavt() {
    this.onRemoveFavt.emit({ _id: this.data._id });
  }

}
