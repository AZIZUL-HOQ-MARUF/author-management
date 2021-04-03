import { Component, OnInit } from '@angular/core';
import { INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from '../../../../shared/application.constant';
import { StorageService } from '../../../../core/services/storage-service.service';
import { Author } from '../../../../models/author.model';

@Component({
  selector: 'app-favt-author',
  templateUrl: './favt-author.component.html',
  styleUrls: ['./favt-author.component.css']
})
export class FavtAuthorComponent implements OnInit {

  authorList: Author [] = [];

  public selectedPage = 1;

  public itemPerPage = INITIAL_PAGE_LIMIT;

  public pageSizeInterVal = PAGE_SIZE_INTERVAL;
  
  public pageNumbers: any[] = [];

  constructor(private storageS: StorageService) { }

  ngOnInit() {
    let favAuthors = this.getFvrtData();
    this.getFavtAuthorList(favAuthors);
  }

  private getFavtAuthorList(authors: any) {
    this.authorList = [];
    Object.keys(authors).forEach(key => void this.authorList.push(authors[key]));
  }

  get favAuthors(): Author[] {
    let pageIndex = (this.selectedPage - 1) * this.itemPerPage;
    this.pageNumbers = Array(Math.ceil(this.authorList.length / this.itemPerPage)).fill(0).map((x, i) => i + 1);
    return this.authorList.slice(pageIndex, pageIndex + this.itemPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = Number(newPage);
  }

  changePageSize(event: Event): void {
    let newSize = (event.target as HTMLSelectElement).value;
    this.itemPerPage = Number(newSize);
    this.changePage(1);
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
