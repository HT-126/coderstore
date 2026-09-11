import { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import ProductList from "../components/ProductList";
import { FormProvider } from "../components/form";
import { useForm, useWatch } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {
    gender: [],
    category: "All",
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { control, reset } = methods;
  const filters = useWatch({ control, defaultValue: defaultValues });
  const filterProducts = applyFilter(products, filters);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/products");
        setProducts(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            sx={{
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <ProductSearch />
            <ProductSort />
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={filterProducts} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

function applyFilter(products, filters) {
  const {
    gender = [],
    category = "All",
    priceRange = "",
    searchQuery = "",
    sortBy = "featured",
  } = filters;

  const query = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    if (gender.length > 0 && !gender.includes(product.gender)) {
      return false;
    }

    if (category !== "All" && product.category !== category) {
      return false;
    }

    if (priceRange === "below" && !(product.price < 25)) {
      return false;
    }

    if (
      priceRange === "between" &&
      !(product.price >= 25 && product.price <= 75)
    ) {
      return false;
    }

    if (priceRange === "above" && !(product.price > 75)) {
      return false;
    }

    if (query && !product.name.toLowerCase().includes(query)) {
      return false;
    }

    return true;
  });

  const sortOptions = {
    featured: ["sold", "desc"],
    newest: ["createdAt", "desc"],
    priceDesc: ["price", "desc"],
    priceAsc: ["price", "asc"],
  };

  const sort = sortOptions[sortBy];

  return sort
    ? orderBy(filteredProducts, [sort[0]], [sort[1]])
    : filteredProducts;
}

export default HomePage;
