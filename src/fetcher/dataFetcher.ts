import { Alert } from 'react-native';
import { AnyAction } from 'redux';
import { googleapis } from "./baseUrl";
import { setAppData } from "src/modules/app/actions";
import { store } from "src/store";

function formatResponse(response: AnyAction) {
  const keys = response.values[0];
  const data = response.values.slice(1);
  const obj = data.map(arr => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
  store.dispatch(setAppData(obj as any));
}

export const getData = async (): Promise<any> => {
  try {
    const SHEET_ID = '1t42ElSMc1wWdeaMFzgCskSdIITu875qYS8eL7rjEEcM'
    const SHEET_NAME = 'sheetsDB'
    const API_KEY = 'AIzaSyC7ZGumQSDUPO2vOh8FA1Ljo_SHJp7h7m8'
    const res: any = await googleapis.get(`/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`);
    console.log("\x1b[33m  file: dataFetcher.ts:21  getData  res", res)
    
    formatResponse(res.data);
    return Promise.resolve(res.data);
  } catch (error: any) {
    Alert.alert('error',error.message)
    console.log("\x1b[33m  file: dataFetcher.ts:24  gatData  error", error)
    return Promise.reject(error);
  }
};
