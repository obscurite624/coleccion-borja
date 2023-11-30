import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {

        setUser: (action) => {
            return action.payload;
        },

        addUser: (state, action) => {
            const existingUserIndex = state.findIndex(
                (user) => user.id === action.payload.id
            );

            if (existingProductIndex === -1) {
                return [...state, action.payload];
            } else {
                return state.map((user, index) =>
                    index === existingUserIndex ? action.payload : user
                );
            }
        },

        deleteUser: (state, action) => {
            return state.filter((user) => user.id !== action.payload);
        },
        
    },
});

export const { setUser, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;