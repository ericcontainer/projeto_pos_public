import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import GlobalContent from "./components/scenes/GlobalContent";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <GlobalContent />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
