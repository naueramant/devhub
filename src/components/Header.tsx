import { Box, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import { config } from "../config";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: FunctionComponent = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        py: 2.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src={config.companyLogo}
          alt={`${config.companyName} logo`}
          sx={{
            height: 36,
            width: "auto",
            objectFit: "contain",
          }}
        />
        <Typography level="h4" component="h1" fontWeight={600}>
          {config.companyName}
        </Typography>
      </Box>
      <ThemeSwitcher />
    </Box>
  );
};

export default Header;
