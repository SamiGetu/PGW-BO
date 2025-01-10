import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Protected from "./Routes/Routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F58634",
    },
    secondary: {
      main: "#3E4095",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Protected />
    </ThemeProvider>
  );
}

export default App;
