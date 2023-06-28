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
    const gameId = Object.keys(response.data).find((key) => key === id);

    return gameId ? response.data[gameId] : null;
  },
);

const getCurrencies = (games) =>
  games.reduce((acc, game) => {
    Object.keys(game.real).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });

    return acc;
  }, []);

const getProviders = (games) =>
  games.reduce((acc, game) => {
    if (!acc.includes(game.provider)) {
      acc.push(game.provider);
    }

    return acc;
  }, []);

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
