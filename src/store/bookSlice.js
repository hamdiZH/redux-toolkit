import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// CreateAsyncThunk takes two parameters: typePrefix and payloadCreator
export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      // Part 2
      // dispatch({type: 'book/getBooks/pending', payload: undefined})
      const res = await fetch('http://localhost:5000/books');
      return await res.json();
      // const data = await res.json();
      // return data;
      // dispatch({type: 'book/getBooks/fulfilled', payload: data})
    } catch (error) {
      return rejectWithValue(error.message);
      // dispatch({type: 'book/getBooks/rejected', payload: error})
    }
  });

export const insertBook = createAsyncThunk(
  'book/insertBook',
  async (bookData, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI
    try {
      bookData.username = getState().auth.name;
      const res = await fetch('http://localhost:5000/books', {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await res.json();
      // const data = await res.json();
      // return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      await fetch(`http://localhost:5000/books/${id}`, {
        method: 'DELETE',
        // We don't need send 'post' body
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
      return id;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

// Part1
// getBooks -> createAsyncThunk -> create 3 types of actions
// pending createAction('book/getBooks/pending', (payload) => {return payload})
// fulfilled createAction('book/getBooks/fulfilled', (payload) => {return payload})
// rejected createAction('book/getBooks/rejected', (payload) => {return payload})

const bookSlice = createSlice({
  name: "book",
  initialState: {books: [], isLoading: false, error: null},
  reducers: {},
  // HINT: We use extraReducer with actions that implement outside createSlice, ex: getBooks
  extraReducers: {
    //----------------------------- Get Books -----------------------------
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

    //----------------------------- Insert Book -----------------------------
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload)
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //----------------------------- Delete Book -----------------------------
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter(el => el.id !== action.payload);
      console.log(action.payload);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    },
  }
})

export default bookSlice.reducer;