import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CreateAsyncThunk takes two parameters: typePrefix and payloadCreator
export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // Part 2
      // dispatch({type: 'book/getBooks/pending', payload: undefined})
      const res = await fetch('http://localhost:5000/books');
      const data = await res.json();
      return data;
      // dispatch({type: 'book/getBooks/fulfilled', payload: data})
    } catch (error) {
      return rejectWithValue(error.message);
      // dispatch({type: 'book/getBooks/rejected', payload: error})
    }
})

// Part1
// getBooks -> createAsyncThunk -> create 3 types of actions
// pending createAction('book/getBooks/pending', (payload) => {return payload})
// fulfilled createAction('book/getBooks/fulfilled', (payload) => {return payload})
// rejected createAction('book/getBooks/rejected', (payload) => {return payload})

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null },
  reducers: {},
  // HINT: We use extraReducer with actions that implement outside createSlice, ex: getBooks
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default bookSlice.reducer;