import { Box, useTheme, CircularProgress } from "@mui/material";
import SearchBar from "./components/search/SearchBar";
import History from "./components/history/History";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationViaLatLon } from "./actions/geo";
import Weather from "./components/weather/Wrapper";
import AlertMessage from "./components/Alert";

function App() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const p = position.coords;

      await getLocationViaLatLon(dispatch, p.latitude, p.longitude);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.image,
        position: "relative",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 620,
          px: "18px",
          py: { xs: "19px", sm: "26px" },
        }}
      >
        <SearchBar />
        <Weather />
        <History />
      </Box>
      <AlertMessage />
    </Box>
  );
}

export default App;
