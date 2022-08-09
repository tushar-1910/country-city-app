export let GET_CITY = 'GET_CITY';
export let GET_CITY_LOADING = 'GET_CITY_LOADING';
export let GET_CITY_SUCCESS = 'GET_CITY_SUCCESS';

export const getCityLoading = () => {
    return {
        type: GET_CITY_LOADING
    }
}
export const getCitySuccess = (data) => {
    return {
        type: GET_CITY_SUCCESS,
        data
    }
};

export const getcity = () => async(dispatch) => {
    try {
        dispatch(getCityLoading());
        const response = await fetch('http://localhost:8080/cities');
        let data = await response.json();
        dispatch(getCitySuccess(data));
    } catch (error) {
        console.log(error);
    }
}

export const sortPopulation = (order,country) => async(dispatch) => {
    try {
        console.log(order,country)
        dispatch(getCityLoading());
        const response = await fetch(`http://localhost:8080/cities`);
        let data = await response.json();
        if(order === 'asc'){
            data.sort((a,b) => a.population - b.population);
        }
        if(order === 'desc'){
            data.sort((a,b) => b.population - a.population);
        }
        if(country)
        {
            data = data.filter(item => item.country === country);
        }
        dispatch(getCitySuccess(data));
    } catch (error) {
        console.log(error);
    }
}

export const filterCountry = (country) => async(dispatch) => {
    try {
        if(country === "")
        {
            dispatch(getcity());
            return;
        }
        dispatch(getCityLoading());
        const response = await fetch(`http://localhost:8080/cities?country=${country}`);
        let data = await response.json();
        dispatch(getCitySuccess(data));
    } catch (error) {
        console.log(error);
    }
}