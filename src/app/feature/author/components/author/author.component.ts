import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../../../../models/author.model';
import { ApiService } from '../../../../core/services/api-service.service';
import { INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from '../../../../shared/application.constant';
import { StorageService } from '../../../../core/services/storage-service.service';

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

  private getAuthorData(): void {
    this.subscriptions.push(
      this.apiS.get(`authors?limit=${this.itemPerPage}&skip=${this.skip}`).subscribe(res => {
        this.totalCount = res.totalCount;

        this.authorList = res.results.map((data: Author) => {
          if (this.favAuthors[data._id] !== undefined && this.favAuthors[data._id].hasOwnProperty("isFav")) {
            data.isFav = this.favAuthors[data._id].isFav;
          } else {
            data.isFav = false;
          }
          return data;
        });

        this.pageNumbers = Array(Math.ceil(this.totalCount / this.itemPerPage)).fill(0).map((x, i) => i + 1);
      })
    );
  }

  onChangeAddToFavt(author: Author): void {
    this.setFavtData(author);
    this.favAuthors = this.getFvrtData();
  }

  onChangeRemoveFavt(author: Author): void {
    this.removeFromFavtData(author);
    this.favAuthors = this.getFvrtData();
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => void sub.unsubscribe());
  }

  trackByFn(index: any, author: Author) {
    return author ? author._id : null;
  }
  
}
