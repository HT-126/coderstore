import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box
      component="img"
      src="/logo.jpg"
      alt="Logo"
      sx={{
        width: 40,
        height: 40,
        objectFit: "contain",
        ...sx,
      }}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;