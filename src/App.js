import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { css } from '@emotion/core';
// First way to import
import { ClimbingBoxLoader } from 'react-spinners';


function App() {
  const [weather, setWeather] = useState(null);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;`;
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((post)=>{
      getData(post.coords.latitude, post.coords.longitude);
    })
  }
  useEffect(()=>{
    getLocation();
  },[])
  const getData = async(lat, lon) => {
    const api = "1c6a204f2efa699212b079e36cb007ab";
    const url =`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${api}&units=metric`;
    const response = await fetch(url)
    const data = await response.json();    
    setWeather(data);

  }
  console.log(weather);
  if(!weather){
    return(
      <div className='sweet-loading'>
        <ClimbingBoxLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={'#123abc'}
        />
      </div> 
    )
  }
  else return (
    <div className="container-fluid text-white my-auto">
      <div className="container mx-auto my-4 py-4">
        <div className="row justify-content-center text-center">
          <h1 className="col-12 display-4 my-2 py-3 text-success">
            Awesome Weather App
          </h1>
          <h2 className="col-12">{weather && weather.city.name}</h2>
          <h3 className="col-12 text-danger">{weather && weather.list[0].main.temp}</h3>
          <h3 className="col-12">Weather Description</h3>
        </div>
      </div>
    </div>
  );
}
export default App;
