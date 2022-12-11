import React, { useState}  from 'react'
import './App.css'

import axios from 'axios'
import {video} from './assets'
import { TiWeatherWindyCloudy } from 'react-icons/ti'

function App() {
  const [location, setLocation] = useState('')
  const [data, setData] = useState({})
  const urlApi=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=105c97c8e572a0683e77a97560fd1e98`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(urlApi).then((response) => {
        setData(response.data)
        console.log(response.data);
        const tem = ( response.data.main.temp - 32)*5/9 
        console.log(tem);
      })
      setLocation('')
    }
  }
  
  return (
    
    <div className="App w-full h-screen relative ">
    <div className="logo absolute top-8 left-8">
      <a href="#" className='text-white flex flex-row  text-3xl font-bold '>
        <TiWeatherWindyCloudy size={40} className='mr-3' />
        WeatherYGG
      </a>
    </div>
      <div className="container max-w-[700px] h-[700px] m-auto px-4 relative top-[10%] flex flex-col justify-between ">
        <div className='search text-center p-4 my-4 '>
            <input type="text" value={location}
              className='py-3 w-[80%] sm:w-[50%] px-5 rounded-3xl outline-none text-white text-lg sm:text-xl font-medium border-2 border-white/80 bg-white/10'
              onKeyPress={searchLocation}
              onChange={event => setLocation(event.target.value)}
              placeholder='Enter Location' 
            />
        </div>
        
        <div className="container__top w-full my-4 mx-auto ">
          <div className="location">
            <h1 className='text-white text-2xl font-medium'>{data.name}</h1>
          </div>
          <div className="temp">
            {data.main ? 
              <h2 className='text-6xl sm:text-8xl font-bold text-white'>{((data.main.temp - 32) *5/9).toFixed()} °C</h2> : null
            }
              {/* <h2 className='text-8xl font-bold text-white'>{tem} F</h2> */}
          </div>
          <div className='description relative right-[-90%] text-white text-2xl '>{data.weather ? <p>{data.weather[0].main}</p> : null }</div>
        </div>

      {data.name != undefined &&
        <div className="container__bottom flex justify-evenly text-center w-full my-4 mx-auto rounded-lg p-4 " style={{backgroundColor : "rgba(255,255,255,0.2)"}}>
          <div className="feels">
          {data.main ? 
              <h3 className='text-lg sm:text-2xl text-white font-bold'>{(((data.main.feels_like) -32 )*5/9).toFixed()} °C</h3> : null
            }
            <p className='text-lg sm:text-2xl text-white '>Feels</p>
          </div>
          <div className="humidity">
          {data.main ? 
              <h3 className='text-lg sm:text-2xl text-white font-bold'>{data.main.humidity} %</h3> : null
            }
            <p className='text-lg sm:text-2xl text-white '>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? 
              <h3 className='text-lg sm:text-2xl text-white font-bold'>{data.wind.speed.toFixed()} MPH</h3> : null
            }
            <p className='text-lg sm:text-2xl text-white '>Wind Speed</p>
          </div>
        </div>
      }
      </div>
      <video src={video} autoPlay="on" loop preload='auto' muted className='absolute top-0 left-0 w-full h-screen object-cover -z-10' />
    </div>
  )
}

export default App
