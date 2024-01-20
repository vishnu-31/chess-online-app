import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface flagDataState {
    isAborted: boolean,
	isYourturn: boolean,
	dataLoaded: boolean,
	toChoose: boolean, 
	isRoomFull: boolean
}

const initialState: flagDataState = {
    isAborted:false,
    isYourturn:false,
    dataLoaded:false,
    toChoose:false,
    isRoomFull:false
};


const flagDataSlice = createSlice({
    name:"flagData",
    initialState,
    reducers:{
        abort(state){
            state.isAborted = true;
        },
        setYourturn(state, action:PayloadAction<boolean>){
            state.isYourturn = action.payload;
        },
        setDataLoaded(state){
            state.dataLoaded=true;
        },
        setToChoose(state,action:PayloadAction<boolean>){
            state.toChoose=action.payload;
        },
        setIsRoomFull(state){
            state.isRoomFull=true;
        }
    }
})  

export const {abort, setYourturn, setDataLoaded, setToChoose, setIsRoomFull} = flagDataSlice.actions;

export default flagDataSlice.reducer;