import { createStore } from "redux";
import combinedReducers from "../reducers/combinedReducers";

export let store = createStore(combinedReducers);

export default store;
