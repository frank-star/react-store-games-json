import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axios.get('/db/mock-games-data.json');

  return Object.keys(response.data)
    .map((key) => ({
      id: key,
      ...response.data[key],
    }))
    .sort(
      (start, end) => start.collections.popularity - end.collections.popularity,
    );
});

export const fetchGameById = createAsyncThunk(
  'games/fetchGameById',
  async (id) => {
    const response = await axios.get('/db/mock-games-data.json');
    const game = Object.keys(response.data).filter((key) => key === id);

    return game ? response.data[game.at(0)] : null;
  },
);

const getCurrencies = (games) => {
  const currencies = [];

  Object.keys(games).forEach((key) =>
    Object.keys(games[key].real).forEach((key) => {
      if (!currencies.includes(key)) {
        currencies.push(key);
      }
    }),
  );

  return currencies;
};

const getProviders = (games) => {
  const providers = [];

  Object.keys(games).forEach((key) => {
    if (!providers.includes(games[key].provider)) {
      providers.push(games[key].provider);
    }
  });

  return providers;
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    isFetchingList: false,
    isFetchingDetails: false,
    list: [],
    currencies: [],
    providers: [],
    details: {},
  },
  extraReducers: {
    [fetchGames.pending]: (state) => {
      state.isFetchingList = true;
    },
    [fetchGames.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.currencies = getCurrencies(action.payload);
      state.providers = getProviders(action.payload);
      state.isFetchingList = false;
    },

    [fetchGameById.pending]: (state) => {
      state.isFetchingDetails = true;
    },
    [fetchGameById.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isFetchingDetails = false;
    },
  },
});

export default gamesSlice.reducer;
