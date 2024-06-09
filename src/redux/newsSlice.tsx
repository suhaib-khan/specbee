import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface NewsState {
  news: [];
  isLoading: boolean;
  isError: boolean;
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  isError: false,
};

export const getNews = createAsyncThunk(`news`, async () => {
  try {
    const response = await axios.get(
      `https://dev-storm-rest-api.pantheonsite.io/api/v1/news`
    );
    const { data } = response;
    return data;
  } catch (error) {}
});

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
        state.isError = false;
      })
      .addCase(getNews.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.news = [];
      });
  },
});

export default newsSlice.reducer;
