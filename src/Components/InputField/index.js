import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { Select } from "@mui/material";

function index({
  setFieldValue,
  input: { type, label, options, name },
  handleChange,
  ...rest
}) {
  let inputElement = null;

  switch (type) {
    case "text":
      inputElement = <TextField {...rest} />;
      break;
    case "number":
      inputElement = <TextField {...rest} />;
      break;
    case "select":
      inputElement = (
        <>
          <FormControl error={rest.error}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...rest}
              onChange={(event) => {
                setFieldValue(name, event.target.value);
              }}
            >
              {options.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{rest.helperText}</FormHelperText>
          </FormControl>
        </>
      );
      break;
    case "multiSelect":
      inputElement = (
        <FormControl error={rest.error}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            {...rest}
            onChange={(event) => {
              setFieldValue(name, event.target.value);
            }}
          >
            {options.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{rest.helperText}</FormHelperText>
        </FormControl>
      );
      break;
    default:
      inputElement = null;
  }

  return inputElement;
}

export default index;
