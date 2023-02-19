import { ThemeType } from 'src/theme';
import { createAction } from 'typesafe-actions';

export const setAppTheme = createAction('SET_APP_THEME', (value: ThemeType) => value)();
export const setAppData = createAction('SET_APP_DATA', (value: any) => value)();
export const setAppFecthInterval = createAction('SET_APP_FETCH_INTERVAL', (value: { title: string, delay: number }) => value)();
