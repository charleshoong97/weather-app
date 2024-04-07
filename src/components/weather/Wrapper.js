import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import Weather from "./Content";
import Loader from "../Loader";

export default function Wrapper({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.box,
        borderWidth: "1px",
        borderRadius: "20px",
        borderColor: "#FFFFFF80",
        borderStyle: "solid",
        px: ["26px"],
        py: ["20px"],
        mt: ["20px"],
        minHeight: ["146px", "158px"],
      }}
    >
      <Suspense fallback={<Loader />}>
        <Weather />
      </Suspense>
    </Box>
  );
}
