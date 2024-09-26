
import moment from 'moment';
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs, FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import Swal from "sweetalert2";

const Weather = () => {
    const inputRef = useRef();
    const [WeatherData, setWeatherData] = useState(false);
    const searchWeather = async (city) => {
        if (city === "") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Enter city name",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        try {
            const apiKey = process.env.REACT_APP_ID;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
            });
        } catch (error) {
            setWeatherData(false);
            console.error(error);
        }
    }

    useEffect(() => {
        searchWeather("Dhaka");
    }, [])

    return (
        <div className="container mx-auto my-10" style={{ width: '85%' }}>
            <div style={{ backgroundImage: "linear-gradient(45deg, #0f172a, #788ec1)" }} className="flex flex-col md:flex-row items-center justify-between p-6  rounded-xl text-base-300 space-y-6 lg:space-y-0">
                {/* Left side - date */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-medium mb-3">Weather Update</h2>
                    <p className='text-lg'>{moment().format('Do MMMM, YYYY')}</p>
                    <p className='text-lg'>{moment().format('dddd, h:mm A')}</p>
                </div>
                {/* Right side - Weather */}
                <div style={{ backgroundImage: "linear-gradient(45deg, #2f4680, #500ae4)" }} className="rounded-xl p-3 shadow-2xl">
                    {/* Search bar */}
                    <div className="input h-8 flex items-center gap-2 text-black">
                        <input ref={inputRef} type="text" className="grow" placeholder="Search City Name" />
                        <FaSearch onClick={() => searchWeather(inputRef.current.value)} className="cursor-pointer" />
                    </div>
                    {WeatherData ? <>
                        {/* Info */}
                        <div className="flex items-center justify-around ">
                            <div>
                                <img src={`https://openweathermap.org/img/wn/${WeatherData.icon}@2x.png`} alt="Weather-image" />
                            </div>
                            <div>
                                <div className="flex items-center justify-center gap-6">
                                    <h2 className="font-semibold">{WeatherData?.location}</h2>
                                    <p><FaLocationCrosshairs /></p>
                                </div>
                                <h1 className="text-3xl font-bold">{WeatherData?.temperature}°C</h1>
                            </div>
                        </div>
                        {/* Humidity & Wind */}
                        <div className="flex items-center justify-between">
                            {/* Humidity */}
                            <div className="flex items-center gap-2">
                                <span><WiHumidity className="text-3xl" /></span>
                                <div className="text-xs">
                                    <p>{WeatherData?.humidity} %</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            {/* Wind */}
                            <div className="flex items-center gap-3">
                                <span><FaWind className="text-2xl" /></span>
                                <div className="text-xs">
                                    <p>{WeatherData?.windSpeed} Km/h</p>
                                    <span>Wind Speed</span>
                                </div>
                            </div>
                        </div>
                    </> : <></>}
                </div>
            </div>
        </div>
    );
}

export default Weather;
