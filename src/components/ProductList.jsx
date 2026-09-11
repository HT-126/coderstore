import { Alert, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (!products.length) return <Alert severity="info">No products match your filters.</Alert>;
  return <Grid container spacing={3}>{products.map((product) => <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}><ProductCard product={product} /></Grid>)}</Grid>;
}

export default ProductList;
