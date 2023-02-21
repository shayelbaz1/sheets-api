import { Alert } from 'react-native';
import { AnyAction } from 'redux';
import { googleapis } from "./baseUrl";
import { setAppData } from "src/modules/app/actions";
import { store } from "src/store";
import { SHEET_ID, SHEET_NAME, API_KEY } from '@env'

function formatResponse(response: AnyAction) {
  const keys = response.values[0];
  const data = response.values.slice(1);
  const obj = data.map((arr: any) => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
  store.dispatch(setAppData(obj as any));
}

export const getData = async (): Promise<any> => {
  try {
    const res: any = await googleapis.get(`/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`);
    
    formatResponse(res.data);
    return Promise.resolve(res.data);
  } catch (error: any) {
    Alert.alert('error',error.message)
    return Promise.reject(error);
  }
};
