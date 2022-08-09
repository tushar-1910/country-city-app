import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { cityReducer } from "./City/reducer";
import { countryReducer } from "./Country/reducer";

const rootReducer = combineReducers({
    cities: cityReducer,
    countries: countryReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;