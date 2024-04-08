import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHistory } from "../redux/slice/historySlice";
import axios from "../utils/axios";

export function useGetWeather() {
  const [weather, setWeather] = useState(null);
  const dispatch = useDispatch();

  const { location, sync } = useSelector((state) => state.search);
  const { lat, lon } = location ?? {};

  useEffect(() => {
    const getData = async () => {
      const promise = axios
        .get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
        )
        .then((response) => {
          dispatch(addHistory(location));
          return response.data;
        });
      setWeather(promiseWrapper(promise));
    };

    if (lat && lon) {
      getData();
    }
  }, [lat, lon, sync]);

  return weather;
}

const promiseWrapper = (promise) => {
  let status = "pending";
  let result;

  const s = promise.then(
    (value) => {
      status = "success";
      result = value;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return () => {
    switch (status) {
      case "pending":
        throw s;
      case "success":
        return result;
      case "error":
        throw result;
      default:
        throw new Error("Unknown status");
    }
  };
};
