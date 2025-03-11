import React, { useEffect, useState } from "react";

const Weather = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [searchValue, setSearchValue] = useState("Lahore");
  const [info, setInfo] = useState({});
  const [weatherState, setWeatherState] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeatherinfo();
  }, []);

  useEffect(() => {
    if (info.weathermood) {
      const weatherIcons = {
        Clouds: "wi-cloudy",
        Clear: "wi-stars",
        Haze: "wi-fog",
        Mist: "wi-day-cloudy",
        Rain: "wi-rain",
        Snow: "wi-snow",
        Smoke: "wi-smoke",
      };
      setWeatherState(weatherIcons[info.weathermood] || "wi-stars");
    }
  }, [info.weathermood]);

  const fetchWeatherinfo = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;
      const { sunset, country } = data.sys;
      const rainfall = data.rain ? data.rain["1h"] || 0 : 0;

      setInfo({
        temp,
        humidity,
        pressure,
        weathermood,
        speed,
        sunset,
        country,
        rainfall,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFloodRisk = () => {
    const { humidity, pressure, speed, rainfall } = info;
    if (!humidity || !pressure || !speed) return "Data Insufficient";

    if (humidity > 80 && pressure < 1000 && (speed > 10 || rainfall > 10)) {
      return "High Flood Risk";
    } else if (
      humidity > 70 &&
      pressure < 1010 &&
      (speed > 5 || rainfall > 5)
    ) {
      return "Moderate Flood Risk";
    } else {
      return "Low Flood Risk";
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetchWeatherinfo();
  }

  return (
    <div className="flex flex-col items-center p-2 sm:p-6 min-h-screen ">
      <div className="flex space-x-4 mb-6">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter city name..."
            className="px-5 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>

      <div className="text-white bg-[#2d2d2d] min-h-[150px] p-6 rounded-2xl shadow-lg text-center w-full">
        {loading ? (
          <i className="fa fa-spinner fa-spin mt-10"></i>
        ) : (
          <div>
            <div className="text-7xl mb-4 text-blue-500">
              <i className={`wi ${weatherState}`}></i>
            </div>
            <div className="text-4xl font-bold">{info.temp}°C</div>
            <div className="text-xl mt-2 ">{info.weathermood}</div>
            <div className="text-lg  mt-2">
              {searchValue}, {info.country}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 w-full">
        <div className="text-white bg-[#2d2d2d] p-5 rounded-xl shadow-md flex flex-col items-center">
          <i className="fa-solid fa-droplet text-blue-500 text-3xl mb-2"></i>
          {loading ? (
            <i className="fa fa-spinner fa-spin my-2"></i>
          ) : (
            <div className="text-xl font-semibold ">{info.humidity}%</div>
          )}
          <div className="text-sm text-gray-500">Humidity</div>
        </div>
        <div className="text-white bg-[#2d2d2d] p-5 rounded-xl shadow-md flex flex-col items-center">
          <i className="fa-solid fa-gauge text-red-500 text-3xl mb-2"></i>

          {loading ? (
            <i className="fa fa-spinner fa-spin my-2"></i>
          ) : (
            <div className="text-xl font-semibold ">{info.pressure} hPa</div>
          )}
          <div className="text-sm text-gray-500">Pressure</div>
        </div>
        <div className="text-white bg-[#2d2d2d] p-5 rounded-xl shadow-md flex flex-col items-center">
          <i className="fa-solid fa-wind text-green-500 text-3xl mb-2"></i>

          {loading ? (
            <i className="fa fa-spinner fa-spin my-2"></i>
          ) : (
            <div className="text-xl font-semibold ">{info.speed} m/s</div>
          )}
          <div className="text-sm text-gray-500">Wind Speed</div>
        </div>
        <div className="text-white bg-[#2d2d2d] p-5 rounded-xl shadow-md flex flex-col items-center">
          <i className="fa-solid fa-cloud-showers-heavy text-gray-500 text-3xl mb-2"></i>
          {loading ? (
            <i className="fa fa-spinner fa-spin my-2"></i>
          ) : (
            <div className="text-xl font-semibold ">{info.rainfall} mm</div>
          )}
          <div className="text-sm text-gray-500">Rainfall</div>
        </div>
      </div>

      <div className="mt-2 text-white bg-[#2d2d2d] p-6 rounded-2xl shadow-lg text-center w-full">
        <div className="text-xl font-extrabold ">Flood Risk Prediction</div>
        <div
          className={`text-lg font-extrabold mt-3 ${
            getFloodRisk() === "High Flood Risk"
              ? "text-red-500"
              : getFloodRisk() === "Moderate Flood Risk"
              ? "text-orange-500"
              : "text-green-500"
          }`}
        >
          {getFloodRisk()}
        </div>
      </div>
    </div>
  );
};

export default Weather;
