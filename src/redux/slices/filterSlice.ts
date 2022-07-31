import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SortType = {
    name: string;
    sortProperty: 'rating' | 'price' | 'title'
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sort: SortType
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        },
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }

        
    },
})


export const { setCategoryId, setSort, setFilters, setSearch } = filterSlice.actions

export default filterSlice.reducer