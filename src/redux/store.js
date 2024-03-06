import {configureStore} from '@reduxjs/toolkit'
import cardReducer from './features/cardSlice'


export const store = configureStore({
    reducer: cardReducer 
})


//for multiple reducers name so that we can access the particular slicereducder

// const store = configureStore({
//     reducer: {
//       todos: todosReducer,
//       user: userReducer,
//       settings: settingsReducer,
//     },
//   });