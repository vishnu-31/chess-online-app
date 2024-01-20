import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface gameDataState {
    fen: string;
}

const initialState:gameDataState ={
    fen:""
};

const gameDataSlice = createSlice({
    name:"gameData",
    initialState,
    reducers:{
        setFen(state, action:PayloadAction<string>){
            state.fen= action.payload;
        }
    }
})



export const {setFen} = gameDataSlice.actions;

export default gameDataSlice.reducer;