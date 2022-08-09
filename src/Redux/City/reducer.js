import { GET_CITY_LOADING, GET_CITY_SUCCESS } from "./action";

export const cityReducer = (store = {cities:[],loading:false}, action) => {
    switch (action.type) {
        case GET_CITY_LOADING:
            return {
                ...store,
                loading: true
            }
        case GET_CITY_SUCCESS:
            return {
                ...store,
                cities: action.data,
                loading: false
            }
        default:
            return store;
    }
}