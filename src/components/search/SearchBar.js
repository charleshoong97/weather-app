import { Autocomplete, Stack, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../actions/geo";
import {
  searchTextChange,
  updateLocation,
} from "../../redux/slice/searchSlice";
import { getLocationDisplay } from "../../utils/helpers";

export default function SearchBar() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { searchText, options, location } = useSelector(
    (state) => state.search
  );
  const [text, setText] = useState(searchText);

  useEffect(() => {
    setText(searchText);
    if (searchText.length > 2 && searchText !== getLocationDisplay(location)) {
      getLocation(dispatch, searchText);
    }
  }, [searchText]);

  return (
    <Stack direction={"row"} gap={["10px", "20px"]}>
      <Autocomplete
        inputValue={text}
        fullWidth
        options={options.map((op) => ({
          label: getLocationDisplay(op),
          value: op,
        }))}
        onChange={(event, newValue) => {
          if (newValue) {
            dispatch(updateLocation(newValue?.value));
            setText(getLocationDisplay(newValue?.value));
          } else {
            setText("");
          }
        }}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        noOptionsText={"No related city / country found"}
        ListboxProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            color: "white",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="City / Country"
            placeholder="London"
            onChange={(event) => dispatch(searchTextChange(event.target.value))}
            sx={{
              backgroundColor: theme.palette.background.box,
              borderRadius: ["8px", "20px"],
              width: "100%",
              height: [40, 60],
            }}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              style: {
                paddingLeft: "20px",
                paddingRight: "20px",
              },
            }}
            InputLabelProps={{
              style: {
                paddingLeft: "20px",
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
