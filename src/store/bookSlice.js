import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CreateAsyncThunk takes two parameters: typePrefix and payloadCreator
export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, thunkAPI) => {
    try {
      // Part 2
      // dispatch({type: 'book/getBooks/pending', payload: undefined})
      const res = await fetch('http://localhost:5000/books');
      const data = await res.json();
      return data;
      // dispatch({type: 'book/getBooks/fulfilled', payload: data})
    } catch (error) {
      console.log(error)
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
  initialState: { books: null, isLoading: false },
  reducers: {},
  // HINT: We use extraReducer with actions that implement outside createSlice, ex: getBooks
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      console.log(action);
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(action);
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
  }
})

export default bookSlice.reducer;