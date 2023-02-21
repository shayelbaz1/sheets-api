'use strict';
import { ThemeType } from 'src/theme';
import { AppAction } from 'src/types/actions';
import { createReducer } from 'typesafe-actions';
import { setAppTheme, setAppData, setAppFecthInterval } from './actions';

export interface AppState {
  theme: ThemeType;
  data: any,
  fetchIntervel: { title: string, delay: number },
}

const initialState: AppState = {
  theme: 'dark',
  data: null,
  fetchIntervel: {
    title: '1D',
    delay: 1000 * 60 * 60 * 24
  }
};

export const appReducer = createReducer<AppState, AppAction>(initialState)
  .handleAction(setAppTheme, (state, { payload: theme }) => ({ ...state, theme }))
  .handleAction(setAppData, (state, { payload: data }) => ({ ...state, data }))
  .handleAction(setAppFecthInterval, (state, { payload: fetchIntervel }) => ({ ...state, fetchIntervel }));