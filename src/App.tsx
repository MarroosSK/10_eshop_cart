import { Box } from "@mui/material";
import { Container } from "@mui/system";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import CssBaseline from '@mui/material/CssBaseline';
import {Routes, Route} from "react-router-dom"
import { Home, ShoppingCart } from "./pages";
import { Navigation } from "./components";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
  });
  
  const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
  });

function App() {

  const darkModeToggle = useSelector((state: RootState)=> state.darkMode.mode === "dark");

  return (
    <ThemeProvider theme={darkModeToggle ? lightTheme : darkTheme}>
    <CssBaseline />
    <Box>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<ShoppingCart/>}/>
        </Routes>
      </Container>
    </Box>
    </ThemeProvider>
  );
}

export default App;

//JSON server
//json-server --watch data/data.json --port 8000