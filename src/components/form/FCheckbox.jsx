import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

function FCheckbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox {...field} checked={Boolean(field.value)} />
          )}
        />
      }
      {...other}
    />
  );
}

export default FCheckbox;