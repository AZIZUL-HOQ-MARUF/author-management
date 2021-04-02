import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../../models/author.model';
import { ApiService } from '../../core/services/api-service.service';
import { INITIAL_PAGE_LIMIT, PAGE_SIZE_INTERVAL } from '../../shared/application.constant';

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

  constructor(private apiS: ApiService) { }

  ngOnInit() {
    this.getAuthorData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => void sub.unsubscribe());
  }

  trackByFn(index: any, author: Author) {
    return author ? author._id : null;
  }

  changePage(newPage: number) {
    this.selectedPage = Number(newPage);
    this.skip = (this.selectedPage * this.itemPerPage) - this.itemPerPage;
    this.getAuthorData();
  }

  changePageSize(event: Event) {
    let newSize = (event.target as HTMLSelectElement).value;
    this.itemPerPage = Number(newSize);
    this.changePage(1);
  }

  get authors(): Author[] {
    let pageIndex = (this.selectedPage - 1) * this.itemPerPage;
    return this.authorList.slice(pageIndex, pageIndex + this.itemPerPage);
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

}
