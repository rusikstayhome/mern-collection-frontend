import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuth/me', async () => {
    const { data } = await axios.get('/auth/me')
    return data;
})

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const { data } = await axios.get('/users')
    return data;
})


const initialState = {
    data: null,
    status: 'loading',
    users: null

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload

        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload

        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null;
        },
        [fetchUsers.pending]: (state) => {
            state.status = 'loading';
            state.users = null;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.users = action.payload;
        },
        [fetchUsers.rejected]: (state) => {
            state.status = 'error';
            state.users = null;
        },

    }
})

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;