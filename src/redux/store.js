import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';

const store = configureStore({
    reducer: {
        collections: collectionsReducer
    },
});

export default store;