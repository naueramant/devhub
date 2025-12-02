import { Box, Card, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import type { Link } from "../models/link";

interface LinkCardProps {
  link: Link;
}

const LinkCard: FunctionComponent<LinkCardProps> = ({ link }) => {
  return (
    <Card
      component="a"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      sx={{
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        p: 2.5,
        borderRadius: "xl",
        backgroundColor: "background.surface",
        borderColor: "divider",
        "&:hover": {
          borderColor: "primary.400",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)",
          backgroundColor: "background.level1",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {link.icon && (
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "lg",
              backgroundColor: "background.level2",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            {link.icon}
          </Box>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography level="title-md" fontWeight={600}>
            {link.title}
          </Typography>
          {link.description && (
            <Typography
              level="body-sm"
              sx={{
                color: "text.tertiary",
                mt: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {link.description}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            color: "text.tertiary",
            fontSize: "1.2rem",
            opacity: 0.5,
            transition: "all 0.2s",
            ".MuiCard-root:hover &": {
              opacity: 1,
              transform: "translateX(4px)",
            },
          }}
        >
          →
        </Box>
      </Box>
    </Card>
  );
};

export default LinkCard;
