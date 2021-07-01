import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from './data-service.service';
import { dataActionTypes } from './store/data.actions';
import { getData } from './store/data.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions$: Subject<any> = new Subject<any>();
  dataSet: Array<any>;
  headers: Array<any>;
  values: Array<string>;
  values$: Observable<any>;
  private newRow: any = {};
  constructor(private dataService: DataService, private store: Store) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.store.dispatch(dataActionTypes.fetchData());
    this.values$ = this.store.select(getData);
    const headers = [];
    this.values$.pipe(takeUntil(this.subscriptions$)).subscribe((data: any) => {
      data.forEach((obj: any, i: number) => {
        headers.push(...Object.keys(obj));
      });
      this.values = Object.values(data);
      console.log(this.values)
      this.headers = [...new Set(headers)];
    })
  }

  addRow(): void {
    this.store.dispatch(dataActionTypes.addEmptyItem());
    this.values$ = this.store.select(getData);
  }

  deleteRow(event): void {
    const el = event.target as HTMLElement;
    alert(el.parentElement.parentElement.parentElement.parentElement.tagName)
    el.parentElement.parentElement.parentElement.parentElement.remove()
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}


