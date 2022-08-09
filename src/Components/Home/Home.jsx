import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterCountry, getcity, sortPopulation } from '../../Redux/City/action'
import { getCountry } from '../../Redux/Country/action'
import TransitionsModal from '../Edit/Edit'
import Button from '@mui/material/Button';
import { Skeleton } from '@mui/material'
function Home() {

    const { cities, loading } = useSelector(store => store.cities)
    const { countries } = useSelector(store => store.countries)
    const dispatch = useDispatch()
    const [country, setCountry] = React.useState("");
    const handleDelete = async (id) => {
        try {
            await fetch(`https://country-city-app-tushar.herokuapp.com/cities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            dispatch(getcity())
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        dispatch(getcity());
        dispatch(getCountry());
    }, [dispatch])
    console.log(cities)
    return (
        <div style={{ margin: "Auto", width: "30rem" }}>
            <select id="sort" onChange={(e) => { dispatch(sortPopulation(e.target.value, country)) }}>
                <option value="">Sort By</option>
                <option value="asc">Ascending Order</option>
                <option value="desc">Descending order</option>
            </select>
            <select id="country" value={country} onChange={(e) => { setCountry(e.target.value); dispatch(filterCountry(e.target.value)) }}>
                <option value="">Select Country</option>
                {countries?.map(country => (
                    <option key={country.id} value={country.country}>{country.country}</option>
                ))}
            </select>

            <table className='table'>
                <thead >
                    <tr>
                        <th>Id</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Population</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <>
                        <tr><td colSpan="6"><Skeleton animation="wave" /></td></tr>
                        <tr><td colSpan="6"><Skeleton animation="wave" /></td></tr>
                        <tr><td colSpan="6"><Skeleton animation="wave" /></td></tr>
                        <tr><td colSpan="6"><Skeleton animation="wave" /></td></tr>
                    </> : cities.map((city, index) => (
                        <tr key={city.id}>
                            <td>{index + 1}</td>
                            <td>{city.country}</td>
                            <td>{city.city}</td>
                            <td>{city.population}</td>
                            <td><TransitionsModal item={city} /></td>
                            <td><Button onClick={() => { handleDelete(city.id) }}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;