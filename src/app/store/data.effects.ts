import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { dataActionTypes } from './data.actions';
import { DataService } from '../data-service.service';


@Injectable()
export class DataEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dataActionTypes.fetchData),
      concatMap(() => this.dataService.getData()),
      map(data => dataActionTypes.dataFetched({ data }))
    )
  );
  constructor(private actions$: Actions, private dataService: DataService) { }
}
