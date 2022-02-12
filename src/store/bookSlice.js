import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CreateAsyncThunk takes two parameters: typePrefix and payloadCreator
const getBooks = createAsyncThunk( 'book/getBooks', async (_, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:5000/books');
      const data = await res.json();
      return data;

    } catch (error) {
      console.log(error)
    }
})

const bookSlice = createSlice({
  name: "book",
  initialState: { books: null },
  reducers: {},
})

export default bookSlice.reducer;