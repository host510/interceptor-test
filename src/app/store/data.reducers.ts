
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { dataActionTypes } from './data.actions';


export interface DataState extends EntityState<any> {
  data: any
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState = adapter.getInitialState({
  data: []
});


export const dataReducer = createReducer(
  initialState,

  on(dataActionTypes.dataFetched, (state, { data }) => ({ ...state, data })),
  on(dataActionTypes.addEmptyItem, (state) => ({ ...state, data: [...state.data, {}] }))
);
export const { selectAll } = adapter.getSelectors();

