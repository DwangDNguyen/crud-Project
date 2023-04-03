import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import usersReducer from "./userSlice.js";
import personReducer from "./personSlice.js";

// import userReducer from "./reducers/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
    key: "root-crud",
    version: 1,
    storage,
};

// const rootReducer = combineReducers({ user: userReducer, eventReducer });
const rootReducer = combineReducers({
    users: usersReducer,
    person: personReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

let persistor = persistStore(store);

export default store;
export { persistor };
