import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'


type Pizza = {
    id: string;
    name: string;
    sizes: number[];
    types: number[];
    imageUrl: string;
    price: number
}

interface PizzasSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error'
}
const initialState: PizzasSliceState = {
    items: [],
    status: 'loading'
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {categories, sortBy, search} = params
        const { data } = await axios.get<Pizza[]>(
            `https://62b42075a36f3a973d2c7e79.mockapi.io/items?${categories}${search}&sortBy=${sortBy}&order=desc`
        )
        return data
    }
)

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = 'loading'
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'success'
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error'
            state.items = []
        })
    }
})


export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer