import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({
  systemPrompt,
  setSystemPrompt,
  systemPromptOptions,
}) {
  return (
    <div>
      <div>{`label: ${
        systemPrompt !== null ? `'${systemPrompt.label}'` : "null"
      }`}</div>
      <div>{`value: ${
        systemPrompt !== null ? `'${systemPrompt.value}'` : "null"
      }`}</div>
      <Autocomplete
        onChange={(event: any, newValue) => {
          setSystemPrompt(newValue);
        }}
        value={systemPrompt}
        disablePortal
        id="combo-box-demo"
        options={systemPromptOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Prompt" />}
      />
    </div>
  );
}
