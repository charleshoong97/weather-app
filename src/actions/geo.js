import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { addHistory } from "../redux/slice/historySlice";
import { getWeather } from "./weather";
import {
  searchTextChange,
  updateLocation,
  updateOptions,
} from "../redux/slice/searchSlice";
import { getLocationDisplay } from "../utils/helpers";
import { showWarning } from "../redux/slice/alertSlice";

export const getLocation = async (dispatch, searchText) => {
  return await axios
    .get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
        searchText
      )}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
    )
    .then(async (res) => {
      if (res.data?.length > 0) {
        const seen = {};
        const temp = res.data.filter((item) => {
          const key = item.name + "|" + item.country;
          if (!seen[key]) {
            seen[key] = true;
            return true;
          }
          return false;
        });
        dispatch(updateOptions(temp));
        return res.data;
      }
    })
    .catch((error) => alert(error));
};

export const getLocationViaLatLon = async (dispatch, lat, lon) => {
  await axios
    .get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
    )
    .then(async (res) => {
      if (res.data?.length > 0) {
        dispatch(searchTextChange(getLocationDisplay(res.data[0])));
        dispatch(updateOptions([res.data[0]]));
        dispatch(updateLocation(res.data[0]));
      } else {
        alert("no result");
      }
    })
    .catch((error) => alert(error));

  // await getWeather(dispatch, lat, lon);
};
