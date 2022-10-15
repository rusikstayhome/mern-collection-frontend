import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        auth: authReducer
    },
});

export default store;