import { Box, IconButton, Tooltip } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import type { FunctionComponent } from "react";

type Mode = "system" | "light" | "dark";

const modes: { value: Mode; icon: string; label: string }[] = [
  { value: "light", icon: "☀️", label: "Light" },
  { value: "dark", icon: "🌙", label: "Dark" },
  { value: "system", icon: "💻", label: "System" },
];

const ThemeSwitcher: FunctionComponent = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        p: 0.5,
        borderRadius: "lg",
        backgroundColor: "background.level1",
      }}
    >
      {modes.map((m) => (
        <Tooltip key={m.value} title={m.label} placement="bottom">
          <IconButton
            size="sm"
            variant={mode === m.value ? "solid" : "plain"}
            color={mode === m.value ? "primary" : "neutral"}
            onClick={() => setMode(m.value)}
            sx={{
              borderRadius: "md",
              fontSize: "1rem",
              minWidth: 36,
              minHeight: 36,
            }}
          >
            {m.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ThemeSwitcher;
