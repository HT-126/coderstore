import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function ProductSearch() {
  const { register } = useFormContext();
  return <TextField size="small" label="Search products" {...register("searchQuery")} />;
}

export default ProductSearch;
