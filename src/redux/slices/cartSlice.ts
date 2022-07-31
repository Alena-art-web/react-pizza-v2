import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItemType = {
    name: string;
    id: string;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    count: number
}

interface CartSliceState {
    items: CartItemType[]
    totalPrice: number
}

const cartData = getCartFromLS()
const initialState: CartSliceState = {
    items: cartData.items,
    totalPrice: cartData.totalPrice
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            } 
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },


    },
})


export const { addItem, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer
