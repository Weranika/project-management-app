import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LOCALES } from '../lang/locales';

function getInitialLocale() {
  const savedLocale = localStorage.getItem('lang');
  return savedLocale || LOCALES.ENGLISH;
}

const initialState = {
  lang: getInitialLocale(),
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(
      state: {
        lang: string;
      },
      { payload }: PayloadAction<string>
    ) {
      state.lang = payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
