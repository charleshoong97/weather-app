import { Sync } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useGetWeather } from "../../actions/weather";
import { toggleSync } from "../../redux/slice/searchSlice";
import { dateFormat } from "../../utils/constants";
import { getDisplayCelcius, getLocationDisplay } from "../../utils/helpers";

export default function Weather() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.search.location);

  const weather = useGetWeather();

  return weather ? (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontWeight={"500"}>Today's Weather</Typography>
        <IconButton sx={{ p: 0 }} onClick={() => dispatch(toggleSync())}>
          <Sync sx={{ color: "white" }} />
        </IconButton>
      </Stack>
      <Stack direction={"row"} position={"relative"} gap={["0", "20px"]}>
        <Stack direction={"column"} gap={["5px"]}>
          <Typography
            fontWeight={"600"}
            color={theme.palette.background.default}
            fontSize={["50px"]}
          >
            {getDisplayCelcius(weather?.current?.temp)}
            &deg;C
          </Typography>
          <Typography>
            H:{getDisplayCelcius(weather?.daily[0]?.temp.max)}&deg;C L:
            {getDisplayCelcius(weather?.daily[0]?.temp.min)}&deg;C
          </Typography>
          <Typography
            color={theme.palette.text.secondary}
            fontWeight={"600"}
            fontSize={["11px", "16px"]}
          >
            {getLocationDisplay(location)}
          </Typography>
        </Stack>
        <Stack
          direction={["column", "row-reverse"]}
          alignItems={"end"}
          justifyContent={["end", "space-evenly"]}
          gap={["5px", "20px"]}
          flex={1}
          color={theme.palette.text.secondary}
        >
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {weather?.current?.weather[0]?.main}
          </Typography>
          <Typography sx={{ whiteSpace: "nowrap" }}>
            Humidity: {weather?.current?.humidity}%
          </Typography>
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {moment.unix(weather?.current?.dt).format(dateFormat)}
          </Typography>
        </Stack>
        <Box sx={{ position: "absolute", right: 0, top: 0 }}>
          <img
            id={"weatherIcon"}
            width={[60, 150]}
            height={[60, 150]}
            src={`https://openweathermap.org/img/wn/${weather?.current?.weather[0]?.icon}@2x.png`}
            loading="lazy"
          />
        </Box>
      </Stack>
    </>
  ) : (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <img width={100} src="/sun.png" />
      <Typography color={"white"} textAlign={"center"} fontSize={["25px"]}>
        Search your city / country
      </Typography>
    </Stack>
  );
}
