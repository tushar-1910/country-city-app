import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getcity } from '../../Redux/City/action'
import { getCountry } from '../../Redux/Country/action'

function City() {
  const { countries } = useSelector(store => store.countries)
  const { cities } = useSelector(store => store.cities)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getCountry());
    dispatch(getcity());
  }, [dispatch])

  const [addcity, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [population, setPopulation] = React.useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(city, country, population);
    try {
     let check = cities.find((city) => city.city === addcity && city.country === country) ;
     if(check){
       alert("City already exists")
     }
     else if(addcity === "" || country === "" || population === ""){
       alert("Please fill all the fields")
     }
      else{
        await fetch('http://localhost:8080/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            city: addcity,
            country: country,
            population: population
          })
        })
        dispatch(getcity());
        alert("City added successfully")
        setCountry("");
        setCity("");
        setPopulation("");
      }
    } catch (error) {
      console.log(error);
    }
      
    }


  return (
    <div>
      <form id='addCity' onSubmit={(e)=>{handleSubmit(e)}}>
        <select id="country" value={country} onChange={(e)=>{setCountry(e.target.value)}}>
          <option value="">Select Country</option>
          {countries?.map(country => (
            <option key={country.id} value={country.country}>{country.country}</option>
          ))}
        </select>
        <input type="text" id="city" value={addcity} onChange={(e)=>{setCity(e.target.value)}} placeholder='Enter City'/>
        <input type="Number" id="population" value={population} onChange={(e)=>{setPopulation(e.target.value)}} placeholder='Enter Population'/>
        <button type="submit">Add City</button>
      </form>
    </div>
  )
}

export default City