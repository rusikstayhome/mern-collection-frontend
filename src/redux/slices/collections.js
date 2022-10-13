import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collections: {
        items: [],
        status: 'loading'
    },
    items: {
        items: [],
        status: 'loading'
    }
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducer: {},
});

export const collectionsReducer = collectionsSlice.reducer;