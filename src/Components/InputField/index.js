import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { Select } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

function index({
  setFieldValue,
  input: { type, label, options, name, note },
  handleChange,
  helperText,
  value,
  ...rest
}) {
  let inputElement = null;

  switch (type) {
    case "text":
      inputElement = (
        <TextField value={value} helperText={helperText} {...rest} />
      );
      break;
    case "number":
      inputElement = (
        <TextField value={value} helperText={helperText} {...rest} />
      );
      break;
    case "select":
      inputElement = (
        <>
          <FormControl error={rest.error}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              value={value}
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
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </>
      );
      break;
    case "multiSelect":
      console.log(rest);
      inputElement = (
        <FormControl error={rest.error}>
          <Autocomplete
            value={value}
            multiple
            id="tags-outlined"
            options={options}
            getOptionLabel={(option) => option.label}
            defaultValue={[]}
            error={true}
            filterSelectedOptions
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  value={rest.value}
                  error={rest.error}
                  variant="outlined"
                  label={label}
                  placeholder={`Add ${label}`}
                />
              );
            }}
            onChange={(e, value) => {
              setFieldValue(name, value);
            }}
          />
          {(note || helperText) && (
            <FormHelperText>{helperText ? helperText : note}</FormHelperText>
          )}
        </FormControl>
      );
      break;
    default:
      inputElement = null;
  }

  return inputElement;
}

export default index;
