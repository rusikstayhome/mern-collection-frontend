import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

export const fetchCollections = createAsyncThunk('collections/fetchCollections', async () => {
    const { data } = await axios.get('/collections')
    return data;
})

export const fetchItems = createAsyncThunk('collections/fetchItems', async () => {
    const { data } = await axios.get('/items')
    return data;
})

export const fetchTags = createAsyncThunk('collections/fetchTags', async () => {
    const { data } = await axios.get('/tags')
    return data;
})

export const fetchRemoveCollection = createAsyncThunk('collections/fetchRemoveCollection', async (id) => {
    axios.delete(`/collections/${id}`)
})
export const fetchRemoveItem = createAsyncThunk('collections/fetchRemoveItem', async (id) => {
    axios.delete(`/items/${id}`)
})

const initialState = {
    collections: {
        items: [],
        status: 'loading'
    },
    items: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {},
    extraReducers: {
        //getting collections
        [fetchCollections.pending]: (state) => {
            state.collections.status = 'loading';
        },
        [fetchCollections.fulfilled]: (state, action) => {
            state.collections.items = action.payload;
            state.collections.status = 'loaded';
        },
        [fetchCollections.rejected]: (state) => {
            state.collections.items = [];
            state.collections.status = 'error';
        },
        // getting tags
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        // getting items
        [fetchItems.pending]: (state) => {
            state.items.status = 'loading';
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items.items = action.payload;
            state.items.status = 'loaded';
        },
        [fetchItems.rejected]: (state) => {
            state.items.items = [];
            state.items.status = 'error';
        },
        // deleting collection
        [fetchRemoveCollection.pending]: (state, action) => {
            state.collections.items = state.collections.items.filter(obj => obj._id !== action.meta.arg)
        },
        // deleting item
        [fetchRemoveItem.pending]: (state, action) => {
            state.items.items = state.items.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
});

export const collectionsReducer = collectionsSlice.reducer;
