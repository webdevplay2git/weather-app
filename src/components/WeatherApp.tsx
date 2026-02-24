import { useEffect, useState } from "react";
//import { createClient } from "@supabase/supabase-js";

export function WeatherApp() {
  /*const forecast = {
    name: "Forecast Name",
    startTime: "2026-02-23T01:00:00-06:00",
    endTime: "2026-02-23T01:00:00-06:00",
    startTimeAdj: "2026-02-23T01:00:00-06:00",
    newTimeObject: {},
    isDaytime: false,
    temperature: 16,
    temperatureUnit: "F",
    temperatureTrend: null,
    probabilityOfPrecipitation: {
      unitCode: "wmoUnit:percent",
      value: 0,
    },
    windSpeed: "16 mph",
    windDirection: "NW",
    icon: "https://api.weather.gov/icons/land/night/cold?size=medium",
    shortForecast: "Mostly Cloudy",
    detailedForecast: "Cloudy with a chance of showers",
  };*/

  const [latitude, setLatitude] = useState(38.81);
  const [longitude, setLongitude] = useState(-89.95);
  const [forecastUrl, setForecastUrl] = useState("");
  const [forecasts, setForecasts] = useState([]);

  /*const forecasts = [
    {
      name: "Forecast Name",
      startTime: "2026-02-23T01:00:00-06:00",
      endTime: "2026-02-23T01:00:00-06:00",
      startTimeAdj: "2026-02-23T01:00:00-06:00",
      newTimeObject: {},
      isDaytime: false,
      temperature: 16,
      temperatureUnit: "F",
      temperatureTrend: null,
      probabilityOfPrecipitation: {
        unitCode: "wmoUnit:percent",
        value: 0,
      },
      windSpeed: "16 mph",
      windDirection: "NW",
      icon: "https://api.weather.gov/icons/land/night/cold?size=medium",
      shortForecast: "Mostly Cloudy",
      detailedForecast: "Cloudy with a chance of showers",
    },
  ];*/

  //const startTimeAdj = new Date();
  //const endTimeAdj = new Date();
  //console.log(time);

  const formatTime = (time: string) => new Date(time);
  //console.log(formatTime(forecast.startTime));

  /*const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };*/

  const handleFetchWeather = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`fetchWeather() ${latitude} ${longitude} `);
    //fetchWeather();
    testApi();
  };

  const handleSetForecasts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`setForecasts() ${forecasts}`);
    setForecasts([]);
  };

  const fetchWeather = async () => {
    console.log(`fetchWeather() ${forecastUrl}`);
    try {
      const response = await fetch(forecastUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);
      //setForecasts(data.properties.periods);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(`useEffect()`);
  }, [forecasts]);

  const fetchForecastUrl = async () => {
    console.log(`fetchForecastUrl() ${latitude} ${longitude}`);
    try {
      const response = await fetch(
        `https://api.weather.gov/points/${latitude},${longitude}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      console.log(data.properties.forecast);

      //forecasts.map((forecast) => {});
      setForecastUrl(data.properties.forecast);

      fetchWeather();
    } catch (error) {
      console.error(error);
    }
  };

  //const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const testApi = async () => {
    console.log(`testApi()`);
    /*try {
      const { data, error } =
        //await supabase.functions.invoke("GEOCODING_API_KEY");
        "stuff";
      if (error) console.error(error);
      else console.log(data);
    } catch (error) {
      console.error(error);
    }*/
  };

  console.log(`formatTime(): ${formatTime(String(new Date().toLocaleString))}`);

  return (
    <section
      id="weather-app"
      className="flex flex-col p-2 bg-gray-300 rounded-md wd-96"
    >
      <h1 className="p-1 text-2xl font-bold text-center bg-brown-500 w-full rounded-t-md">
        Weather App
      </h1>
      <h2>forecast</h2>
      <div className="flex justify-between bg-amber-600">
        <div>
          <label htmlFor="latitude" className="p-1">
            Latitude
          </label>
          <input
            id="latitude"
            className="p-1 bg-gray-50 border rounded"
            type="number"
            min="18.91"
            max="71.44"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="longitude" className="p-1">
            Longitude
          </label>
          <input
            id="longitude"
            className="p-1 bg-gray-50 border rounded"
            type="number"
            min="-130"
            max="172"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
        </div>
      </div>
      <small className="invisible">
        Tip: Enter the number first, then add the minus sign at the beginning if
        needed.
      </small>
      <div>
        <button
          className="p-2 text-white font-semibold bg-blue-600 rounded"
          onClick={fetchForecastUrl}
        >
          Fetch Forecasts
        </button>
      </div>
      <div></div>
      <button onClick={handleFetchWeather}>Fetch Weather</button>
      <button onClick={handleSetForecasts}>Set Forecasts</button>
    </section>
  );
}

/*
"periods": [
  {
      "number": 1,
      "name": "Overnight",
      "startTime": "2026-02-23T01:00:00-06:00",
      "endTime": "2026-02-23T06:00:00-06:00",
      "isDaytime": false,
      "temperature": 16,
      "temperatureUnit": "F",
      "temperatureTrend": null,
      "probabilityOfPrecipitation": {
          "unitCode": "wmoUnit:percent",
          "value": 0
      },
      "windSpeed": "16 mph",
      "windDirection": "NW",
      "icon": "https://api.weather.gov/icons/land/night/cold?size=medium",
      "shortForecast": "Mostly Cloudy",
      "detailedForecast": "Mostly cloudy, with a low around 16. Northwest wind around 16 mph, with gusts as high as 24 mph."
  },
]


  https://api.weather.gov/points/38.81,-89.95
  https://api.weather.gov/points/38.81,-89.95/forecast/hourly

  `https://api.weather.gov/points/${lat},${lon}`

  - All of US: 18.91(N) to 71.44(N); -130(W) to 172(E);

  Reverse Geocoding: (Convert coordinates to address):
- https://geocode.maps.co/reverse?lat=latitude&lon=longitude&api_key=YOUR_SECRET_API_KEY

Forward Geocoding: (Search or convert address to coordinates):
- https://geocode.maps.co/search?q=address&api_key=YOUR_SECRET_API_KEY


import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
const { data, error } = await supabase.functions.invoke('address-to-coords', {
  body: { name: 'Functions' },
})


const { data, error } = await supabase.functions.invoke('use-secret');
if (error) console.error(error);
else console.log(data);
*/
