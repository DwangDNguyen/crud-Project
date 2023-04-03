import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "vq5Hn@example.com",
            age: 25,
            address: "Hà Nội",
        },
        {
            id: 2,
            name: "Nguyễn Văn B",
            email: "vq5vbcHn@example.com",
            age: 27,
            address: "Hà Nội",
        },
    ],

    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;
            const user = state.find((user) => user.id === id);
            if (user) {
                return state.filter((s) => s.id !== id);
            }
        },
        updateUser: (state, action) => {
            const { id, name, email, age, address } = action.payload;
            const updatedUser = state.find((user) => user.id === id);
            if (updatedUser) {
                updatedUser.name = name;
                updatedUser.email = email;
                updatedUser.age = age;
                updatedUser.address = address;
            }
        },
    },
});

export const { addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
