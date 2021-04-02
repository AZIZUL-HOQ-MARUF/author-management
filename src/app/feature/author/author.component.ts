import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../../models/author.model';
import { ApiService } from '../../core/services/api-service.service';
import { INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from '../../shared/application.constant';
import { StorageService } from 'src/app/core/services/storage-service.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {

  authorList: Author [] = [];

  subscriptions: Subscription [] = [];

  public selectedPage = 1;
  
  public itemPerPage = INITIAL_PAGE_LIMIT;

  public pageNumbers : any;

  public skip = 0;
  public totalCount = 0;

  public pageSizeInterVal = PAGE_SIZE_INTERVAL;

  public favAuthors: any = {};

  constructor(private apiS: ApiService, private storageS: StorageService) { }

  ngOnInit() {
    this.getAuthorData();
    this.favAuthors = this.getFvrtData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => void sub.unsubscribe());
  }

  trackByFn(index: any, author: Author) {
    return author ? author._id : null;
  }

  changePage(newPage: number): void {
    this.selectedPage = Number(newPage);
    this.skip = (this.selectedPage * this.itemPerPage) - this.itemPerPage;
    this.getAuthorData();
  }

  changePageSize(event: Event): void {
    let newSize = (event.target as HTMLSelectElement).value;
    this.itemPerPage = Number(newSize);
    this.changePage(1);
  }

  getAuthorData(): void {
    this.subscriptions.push(
      this.apiS.get(`authors?limit=${this.itemPerPage}&skip=${this.skip}`).subscribe(res => {
        this.totalCount = res.totalCount;
        this.authorList = res.results;
        this.pageNumbers = Array(Math.ceil(this.totalCount / this.itemPerPage)).fill(0).map((x, i) => i + 1);
      })
    );
  }

  onChangeAddToFavt(event: any): void {
    this.setFavtData(event);
    this.favAuthors = this.getFvrtData();
  }

  onChangeRemoveFavt(event: any): void {
    this.removeFromFavtData(event);
    this.favAuthors = this.getFvrtData();
  }

  setFavtData(data: any): void {
    let favAuthors: any = this.storageS.getFromLocalStorage('favAuthors');
    if (favAuthors !== null) {
      favAuthors = JSON.parse(favAuthors);
      favAuthors[data._id] = data._id;
      this.storageS.setToLocalStorage('favAuthors',JSON.stringify(favAuthors));
    } else {
      favAuthors = { };
      favAuthors[data._id] = data._id;
      this.storageS.setToLocalStorage('favAuthors',JSON.stringify(favAuthors));
    }
  }

  removeFromFavtData(data: any): void {
    let favAuthors: any = this.storageS.getFromLocalStorage('favAuthors');
    if (favAuthors !== null) {
      favAuthors = JSON.parse(favAuthors);
      delete favAuthors[data._id];
      this.storageS.setToLocalStorage('favAuthors',JSON.stringify(favAuthors));
    }
  }

  getFvrtData(): any {
    let favAuthors: any = this.storageS.getFromLocalStorage('favAuthors');
    return favAuthors !== null ? JSON.parse(favAuthors) : {};
  }
  
}
