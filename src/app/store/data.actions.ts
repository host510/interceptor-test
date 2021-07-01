
import { createAction, props } from '@ngrx/store';

export const fetchData = createAction(
  '[API] Fetch data via Service',
);
export const dataFetched = createAction(
  '[Data Effect] Data Fetched Successfully',
  props<{ data: any[] }>()
);
export const addEmptyItem = createAction(
  '[Component Page] Add Item'
);


export const dataActionTypes = {
  fetchData,
  dataFetched,
  addEmptyItem
};
