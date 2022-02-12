import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CreateAsyncThunk takes two parameters: typePrefix and payloadCreator
export const getBooks = createAsyncThunk( 'book/getBooks', async (_, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:5000/books');
      const data = await res.json();
      return data;

    } catch (error) {
      console.log(error)
    }
})

// HINT: We use extraReducer with actions that implement outside createSlice, ex: getBooks

const bookSlice = createSlice({
  name: "book",
  initialState: { books: null },
  reducers: {},
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      console.log(action);
    },
    [getBooks.fulfilled]: (state, action) => {
      console.log(action);
    },
    [getBooks.rejected]: (state, action) => {
      console.log(action);
    },
  }
})

export default bookSlice.reducer;