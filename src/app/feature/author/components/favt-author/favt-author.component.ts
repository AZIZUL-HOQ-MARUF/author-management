import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../core/services/storage-service.service';
import { Author } from '../../../../models/author.model';

@Component({
  selector: 'app-favt-author',
  templateUrl: './favt-author.component.html',
  styleUrls: ['./favt-author.component.css']
})
export class FavtAuthorComponent implements OnInit {

  authorList: Author [] = [];

  constructor(private storageS: StorageService) { }

  ngOnInit() {
    let favAuthors = this.getFvrtData();
    this.getFavtAuthorList(favAuthors);
  }

  private getFavtAuthorList(authors: any) {
    this.authorList = [];
    Object.keys(authors).forEach(key => void this.authorList.push(authors[key]));
  }

  onChangeAddToFavt(author: Author): void {
    this.setFavtData(author);
    let favAuthors = this.getFvrtData();
    this.getFavtAuthorList(favAuthors);
  }

  onChangeRemoveFavt(author: Author): void {
    this.removeFromFavtData(author);
    let favAuthors = this.getFvrtData();
    this.getFavtAuthorList(favAuthors);
  }

  private setFavtData(data: Author): void {
    let favAuthors: any = this.getFvrtData();
    favAuthors[data._id] = data;
    this.storageS.setToLocalStorage('favAuthors', JSON.stringify(favAuthors));
  }

  private removeFromFavtData(data: Author): void {
    let favAuthors: any = this.getFvrtData();
    delete favAuthors[data._id];
    this.storageS.setToLocalStorage('favAuthors', JSON.stringify(favAuthors));
  }

  private getFvrtData(): any {
    let favAuthors: any = this.storageS.getFromLocalStorage('favAuthors');
    return favAuthors !== null ? JSON.parse(favAuthors) : {};
  }

  trackByFn(index: any, author: Author) {
    return author ? author._id : null;
  }

}
