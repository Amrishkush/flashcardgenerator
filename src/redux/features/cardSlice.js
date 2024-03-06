
import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    cards: [],
    groups : []
}
console.log(initialState.cards)
export const cardSlice = createSlice({
       name: 'myFlashCard',
       initialState,
       reducers: {
        addGroup: (state, action)=>{
            const group = { 
                groupId: action.payload.groupId,
                groupName: action.payload.groupName,
                groupDescription: action.payload.groupDescription, 
                groupImage: action.payload.groupImage,
                noOfCards: action.payload.noOfCards
                
            } 
            state.groups.push(group)
        },
        addCard: (state, action)=>{
                       const card = {
                        id: nanoid(),
                        cardName: action.payload.cardName,
                        cardDescription: action.payload.cardDescription,
                        cardImage: action.payload.cardImage,
                        groupId: action.payload.groupId,
                       }
                       state.cards.push(card)
                }     
}
})


export const {addGroup,addCard} = cardSlice.actions
export default cardSlice.reducer     
