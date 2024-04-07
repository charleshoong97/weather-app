import { Delete, Search } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeHistory } from "../../redux/slice/historySlice";
import {
  searchTextChange,
  updateLocation,
  updateOptions,
} from "../../redux/slice/searchSlice";
import { getLocationDisplay } from "../../utils/helpers";
import { dateFormat } from "../../utils/constants";

export default function History() {
  const history = useSelector((state) => state.history);
  const options = useSelector((state) => state.search.options);
  const dispatch = useDispatch();

  const theme = useTheme();

  return (
    <Box
      visibility={history.length > 0 ? "visible" : "hidden"}
      sx={{
        borderRadius: "24px",
        backgroundColor: theme.palette.background.box,
        px: ["20px"],
        py: ["22px"],
        mt: ["10px"],
      }}
    >
      <Typography fontSize={["14px"]}>Search History</Typography>
      <Box
        sx={{
          paddingTop: "10px",
        }}
      >
        {history.map((his, index) => (
          <Stack
            key={index}
            direction={"row"}
            sx={{
              borderRadius: ["16px"],
              backgroundColor: theme.palette.background.box,
              px: ["10px"],
              py: ["13px"],
              marginBottom: ["18px"],
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography fontSize={["14px"]} lineHeight={["19.07px"]}>
                {getLocationDisplay(his.location)}
              </Typography>
              <Typography
                fontSize={["10px"]}
                lineHeight={["13.62px"]}
                marginTop={["2px"]}
              >
                {his.createdDate.format(dateFormat)}
              </Typography>
            </Box>
            <IconButton
              sx={{
                width: ["34px"],
                height: ["34px"],
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 12px 0px #0000001A",
              }}
              onClick={() => {
                dispatch(
                  updateOptions([
                    ...options.filter(
                      (op) =>
                        op.name !== his.location.name ||
                        op.country !== his.location.country
                    ),
                    his.location,
                  ])
                );
                dispatch(searchTextChange(getLocationDisplay(his.location)));
                dispatch(updateLocation(his.location));
              }}
            >
              <Search />
            </IconButton>
            <IconButton
              sx={{
                marginLeft: ["10px"],
                width: ["34px"],
                height: ["34px"],
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 12px 0px #0000001A",
              }}
              onClick={() => dispatch(removeHistory(his.id))}
            >
              <Delete />
            </IconButton>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
