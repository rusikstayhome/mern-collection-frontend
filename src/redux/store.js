import { configureStore } from '@reduxjs/toolkit';
import { collectionsReducer } from './slices/collections';
import { authReducer } from './slices/auth';
import themeReducer from './slices/theme'

const store = configureStore({
    reducer: {
        collections: collectionsReducer,
        auth: authReducer,
        theme: themeReducer
    },
});

export default store;