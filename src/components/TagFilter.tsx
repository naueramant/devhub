import { Box, Chip } from "@mui/joy";
import { useState, type FunctionComponent } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import type { Link } from "../models/link";

interface TagFilterProps {
  links: Link[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  initialVisibleCount?: number;
}

const TagFilter: FunctionComponent<TagFilterProps> = ({
  links,
  selectedTags,
  onTagToggle,
  initialVisibleCount = 8,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Collect all unique tags with their counts
  const tagCounts = links.reduce<Record<string, number>>((acc, link) => {
    link.tags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Sort tags by count (descending), then alphabetically
  const sortedTags = Object.entries(tagCounts)
    .sort(([tagA, countA], [tagB, countB]) => {
      if (countB !== countA) return countB - countA;
      return tagA.localeCompare(tagB);
    })
    .map(([tag]) => tag);

  if (sortedTags.length === 0) {
    return null;
  }

  const visibleTags = showAll
    ? sortedTags
    : sortedTags.slice(0, initialVisibleCount);
  const hasMore = sortedTags.length > initialVisibleCount;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
        mt: 2,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      {visibleTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <Chip
            key={tag}
            size="sm"
            variant={isSelected ? "solid" : "soft"}
            color={isSelected ? "primary" : "neutral"}
            onClick={() => onTagToggle(tag)}
            sx={{
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: isSelected ? "primary.600" : "neutral.300",
              },
            }}
          >
            {tag}
          </Chip>
        );
      })}
      {hasMore && (
        <Chip
          size="sm"
          variant="plain"
          color="primary"
          onClick={() => setShowAll(!showAll)}
          endDecorator={showAll ? <IoChevronUp /> : <IoChevronDown />}
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "primary.100",
            },
          }}
        >
          {showAll
            ? "Show less"
            : `+${sortedTags.length - initialVisibleCount} more`}
        </Chip>
      )}
    </Box>
  );
};

export default TagFilter;
