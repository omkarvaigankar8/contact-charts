import { Contact } from 'features/Interfaces';
import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

interface InitialState {
    contacts: Contact[];
}
const initialState: InitialState = {
    contacts: [],

};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            console.log("ACTION", action)
            state.contacts = [...state.contacts, action.payload]
        },
        editContact: (state, action: PayloadAction<Contact>) => {
            const updatedContact = action.payload;
            const contactIndex = state.contacts.findIndex(contact => contact.id === updatedContact.id);
            if (contactIndex !== -1) {
                state.contacts[contactIndex] = updatedContact;
            }
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        }
    }
});
export default contactSlice.reducer;
export const { addContact, editContact, deleteContact } = contactSlice.actions;