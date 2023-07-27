import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Props {
  options: {
    label: string;
    value: string;
  }[];
}
export default function ComboBox({ options }: Props) {
  const [value, setValue] = React.useState(options[0]);

  return (
    <div>
      <div>{`label: ${
        value.label !== null ? `'${value.label}'` : "null"
      }`}</div>
      <div>{`value: ${
        value.value !== null ? `'${value.value}'` : "null"
      }`}</div>
      <Autocomplete
        onChange={(event: any, newValue) => {
          if (!newValue) return;

          setValue(newValue);
        }}
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Prompt" />}
      />
    </div>
  );
}
