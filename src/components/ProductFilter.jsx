import { Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const genders = ["Men", "Women", "Kids"];

function ProductFilter({ resetFilter }) {
  const { control, register } = useFormContext();
  return (
    <Stack spacing={2} sx={{ width: 200, pr: 3 }}>
      <Typography variant="h6">Filters</Typography>
      <Controller name="gender" control={control} render={({ field }) => (
        <FormGroup>{genders.map((gender) => (
          <FormControlLabel key={gender} label={gender} control={<Checkbox checked={field.value.includes(gender)} onChange={(event) => field.onChange(event.target.checked ? [...field.value, gender] : field.value.filter((value) => value !== gender))} />} />
        ))}</FormGroup>
      )} />
      <TextField select size="small" label="Category" defaultValue="All" {...register("category")}>
        <MenuItem value="All">All</MenuItem><MenuItem value="Shose">Shoes</MenuItem><MenuItem value="Apparel">Apparel</MenuItem><MenuItem value="Accessories">Accessories</MenuItem>
      </TextField>
      <TextField select size="small" label="Price" defaultValue="" {...register("priceRange")}>
        <MenuItem value="">Any price</MenuItem><MenuItem value="below">Below $25</MenuItem><MenuItem value="between">$25–$75</MenuItem><MenuItem value="above">Above $75</MenuItem>
      </TextField>
      <Button variant="outlined" onClick={() => resetFilter()}>Clear filters</Button>
    </Stack>
  );
}

export default ProductFilter;
