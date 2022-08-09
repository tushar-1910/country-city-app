import { GET_COUNTRY_LOADING, GET_COUNTRY_SUCCESS } from "./action";

export const countryReducer = (store = {countries:[],loading:false}, action) => {
    switch (action.type) {
        case GET_COUNTRY_LOADING:
            return {
                ...store,
                loading: true
            }
        case GET_COUNTRY_SUCCESS:
            return {
                ...store,
                countries: action.data,
                loading: false
            }
        default:
            return store;
    }
}