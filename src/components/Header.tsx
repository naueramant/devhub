import { Box, Tooltip, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import { IoLogoGithub } from "react-icons/io5";
import { config } from "../config";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: FunctionComponent = () => {
  const editUrl = config.githubEditUrl;

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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {editUrl && (
          <Tooltip title="Suggest changes on GitHub" placement="bottom">
            <Box
              component="a"
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: "lg",
                backgroundColor: "background.level1",
                color: "text.primary",
                textDecoration: "none",
                fontSize: "sm",
                fontWeight: 500,
                minHeight: 44,
                transition: "background-color 0.15s",
                "&:hover": {
                  backgroundColor: "background.level2",
                },
              }}
            >
              <IoLogoGithub style={{ fontSize: "1.1rem" }} />
              Edit
            </Box>
          </Tooltip>
        )}
        <ThemeSwitcher />
      </Box>
    </Box>
  );
};

export default Header;
