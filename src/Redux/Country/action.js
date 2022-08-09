export let GET_COUNTRY = 'GET_COUNTRY';
export let GET_COUNTRY_LOADING = 'GET_COUNTRY_LOADING';
export let GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS';

export const isLoading = () => {
    return {
        type: GET_COUNTRY_LOADING
    }
}
export const getCountrySuccess = (data) => {
    return {
        type: GET_COUNTRY_SUCCESS,
        data
    }
};

export const getCountry = () => async(dispatch) => {
    try {
        dispatch(isLoading());
        const response = await fetch('http://localhost:8080/countries');
        let data = await response.json();
        dispatch(getCountrySuccess(data));
    } catch (error) {
        console.log(error);
    }
}