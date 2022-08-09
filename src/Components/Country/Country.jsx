import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from '../../Redux/Country/action';

function Country() {
  const { countries } = useSelector(store => store.countries)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getCountry());
  }, [dispatch])

  const [country, setCountry] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(city, country, population);
    try {
     let check = countries.find((item) => item.country === country) ;
     if(check){
       alert("Country already exists")
     }
     else if(country === ""){
       alert("Please enter country")
     }
      else{
        await fetch('https://country-city-app-tushar.herokuapp.com/countries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            country: country
          })
        })
        dispatch(getCountry());
        alert("Country added successfully")
        setCountry("");
      }
    } catch (error) {
      console.log(error);
    }
      
    }


  return (
    <div>
      <form id='addCity' onSubmit={(e)=>{handleSubmit(e)}}>
        <input type="text" id="country" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder='Enter Country'/>
        <button type="submit">Add Country</button>
      </form>
    </div>
  )
}

export default Country