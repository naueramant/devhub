import { Box, Chip, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import { config } from "../config";
import type { Link } from "../models/link";
import { useFavoritesStore } from "../stores/favorites";
import LinkCard from "./LinkCard";

interface LinkGridProps {
  links: Link[];
  searchQuery: string;
}

const LinkGrid: FunctionComponent<LinkGridProps> = ({ links, searchQuery }) => {
  const { favorites } = useFavoritesStore();

  // Calculate minimum column width based on grid columns (default 4)
  const gridColumns = config.gridColumns ?? 4;
  const minColumnWidth = `${Math.floor(1200 / gridColumns) - 20}px`;

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.description?.toLowerCase().includes(query) ||
      link.category?.toLowerCase().includes(query)
    );
  });

  if (filteredLinks.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 10,
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "3rem" }}>🔍</Typography>
        <Typography level="h4" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
        <Typography level="body-md" sx={{ color: "text.tertiary" }}>
          No links found matching "{searchQuery}"
        </Typography>
      </Box>
    );
  }

  // Separate favorites from other links
  const favoriteLinks = filteredLinks.filter((link) =>
    favorites.includes(link.href)
  );
  const nonFavoriteLinks = filteredLinks.filter(
    (link) => !favorites.includes(link.href)
  );

  // Group non-favorite links by category, preserving order
  const categoryOrder: string[] = [];
  const groupedLinks = nonFavoriteLinks.reduce<Record<string, Link[]>>(
    (acc, link) => {
      const category = link.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
        categoryOrder.push(category);
      }
      acc[category].push(link);
      return acc;
    },
    {}
  );

  // Sort categories based on config
  let sortedCategories: string[];
  if (config.categorySorting === "alphabetical") {
    sortedCategories = categoryOrder.sort();
  } else if (config.categories && config.categories.length > 0) {
    // Use defined order from config.categories
    const definedOrder = config.categories;
    const inDefined = categoryOrder.filter((c) => definedOrder.includes(c));
    const notInDefined = categoryOrder.filter((c) => !definedOrder.includes(c));
    sortedCategories = [
      ...inDefined.sort(
        (a, b) => definedOrder.indexOf(a) - definedOrder.indexOf(b)
      ),
      ...notInDefined,
    ];
  } else {
    // Keep order of first appearance
    sortedCategories = categoryOrder;
  }

  // Sort links within each category based on config
  if (config.linkSorting === "alphabetical") {
    for (const category of sortedCategories) {
      groupedLinks[category].sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {favoriteLinks.length > 0 && (
        <Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <Typography level="title-lg" fontWeight={600}>
              ⭐ Favorites
            </Typography>
            <Chip
              size="sm"
              variant="soft"
              sx={{
                backgroundColor: "neutral.200",
                color: "neutral.700",
              }}
            >
              {favoriteLinks.length}
            </Chip>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`,
              gap: 2,
            }}
          >
            {favoriteLinks.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </Box>
        </Box>
      )}
      {sortedCategories.map((category) => (
        <Box key={category}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <Typography level="title-lg" fontWeight={600}>
              {category}
            </Typography>
            <Chip
              size="sm"
              variant="soft"
              sx={{
                backgroundColor: "neutral.200",
                color: "neutral.700",
              }}
            >
              {groupedLinks[category].length}
            </Chip>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`,
              gap: 2,
            }}
          >
            {groupedLinks[category].map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LinkGrid;
