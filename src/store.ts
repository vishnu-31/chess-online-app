import { configureStore } from "@reduxjs/toolkit";

import flagDataSlice from "./features/flagData/flagDataSlice";
import userDataSlice from "./features/userData/userDataSlice";
import gameDataSlice from "./features/gameData/gameDataSlice";


export const store = configureStore({
    reducer:{
        userData:userDataSlice,
        flagData:flagDataSlice,
        gameData:gameDataSlice
    }
});


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
