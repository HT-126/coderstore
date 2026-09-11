import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../utils";

function ProductCard({ product }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        component={RouterLink}
        to={`/product/${product.id}`}
        sx={{ height: "100%" }}
      >
        <Box
          component="img"
          src={product.cover}
          alt={product.name}
          sx={{ width: 1, aspectRatio: "1", objectFit: "cover" }}
        />
        <CardContent>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Typography variant="subtitle1">{product.name}</Typography>

            {product.status && (
              <Chip size="small" color="error" label={product.status} />
            )}
          </Stack>
          <Rating
            value={product.totalRating}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="h6" color="primary.main">
            {fCurrency(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
