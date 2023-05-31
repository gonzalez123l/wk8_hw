import { createSlice } from '@reduxjs/toolkit';

interface CarState {
    model: string,
    make: string,
    year: string,
    color: string
}

const initialState: CarState = {
    model: '',
    make: '',
    year: '',
    color: ''
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseModel: (state, action) => { state.model = action.payload },
        chooseMake: (state, action) => { state.make = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseColor: (state, action) => { state.color = action.payload },
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
console.log(rootSlice)
export const {
    chooseModel,
    chooseMake,
    chooseYear,
    chooseColor
} = rootSlice.actions;