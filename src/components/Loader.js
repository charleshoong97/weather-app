import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box sx={{ width: "fit-content", mx: "auto" }}>
      <CircularProgress />
    </Box>
  );
}
