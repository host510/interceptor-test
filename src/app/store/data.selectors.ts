import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataState } from './data.reducers';

export const dataSelector = createFeatureSelector<DataState>('data');

export const getData = createSelector(
  dataSelector,
  state => state.data
);

