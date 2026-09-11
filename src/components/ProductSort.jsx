import { MenuItem, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function ProductSort() {
  const { register } = useFormContext();
  return (
    <TextField select size="small" label="Sort by" defaultValue="featured" {...register("sortBy")}>
      <MenuItem value="featured">Featured</MenuItem>
      <MenuItem value="newest">Newest</MenuItem>
      <MenuItem value="priceDesc">Price: high to low</MenuItem>
      <MenuItem value="priceAsc">Price: low to high</MenuItem>
    </TextField>
  );
}

export default ProductSort;
