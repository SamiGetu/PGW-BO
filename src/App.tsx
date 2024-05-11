import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Protected from "./Routes/Routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F58634", // Replace with your desired primary color
    },
    secondary: {
      main: "#3E4095", // Replace with your desired secondary color
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
