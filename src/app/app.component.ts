import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  values: Array<any>;
  values$: Observable<any>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.store.dispatch(dataActionTypes.fetchData());
    this.values$ = this.store.select(getData);
    const headers = [];
    const values = [];
    this.values$.pipe(takeUntil(this.subscriptions$)).subscribe((data: any) => {
      data.forEach((obj: any, i: number) => {
        obj = { ...obj };
        if (!obj.id) { obj.id = i + 1; }
        if (!obj.hidden) { obj.hidden = 0; }
        headers.push(...Object.keys(obj));
        values.push(obj);
      });
      if (!localStorage.getItem('values')) { localStorage.setItem('values', JSON.stringify(values)) }
      this.values = JSON.parse(localStorage.getItem('values'));
      this.headers = [...new Set(headers)];
    })
  }

  addRow(): void {
    const values = [];
    this.store.dispatch(dataActionTypes.addEmptyItem());
    this.values$ = this.store.select(getData);
    this.values$.pipe(takeUntil(this.subscriptions$)).subscribe((data: any) => {
      data.forEach((obj: any, i: number) => {
        obj = { ...obj };
        if (!obj.id) { obj.id = i + 1; }
        if (!obj.hidden) { obj.hidden = 0; }
        values.push(obj);
      });
      localStorage.setItem('values', JSON.stringify(values));
    });
  }

  deleteRow(event): void {
    const id = +event.currentTarget.getAttribute('id');
    const values = [];
    event.target.parentElement.parentElement.parentElement.parentElement.remove();
    this.values.forEach((obj: any) => {
      if (+obj.id === +id) { obj.hidden = 1; }
      values.push(obj);
    });
    localStorage.setItem('values', JSON.stringify(values));
  }

  editRow(): void {
    localStorage.setItem('values', JSON.stringify(this.values));
    this.values = JSON.parse(localStorage.getItem('values'));
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}


