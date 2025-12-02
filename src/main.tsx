import { Box, CssBaseline, CssVarsProvider, styled } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import theme from "./theme";
import IndexView from "./views";

const Main = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100%",
  backgroundColor: "var(--joy-palette-background-body)",
  color: "var(--joy-palette-text-primary)",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssVarsProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey="theme-mode"
    >
      <CssBaseline />
      <Main>
        <IndexView />
      </Main>
    </CssVarsProvider>
  </StrictMode>
);
