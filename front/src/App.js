import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "screens/homePage";
import LoginPage from "screens/loginPage";
import ProfilePage from "screens/profilePage";
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import state from "state";

function App() {
const mode = useSelector((state) => state.mode)
const theme = useMemo(()=> createTheme(themeSettings(mode), [mode]))
  return (
    <div className="app">
         <BrowserRouter>
         <ThemeProvider theme={theme}>
        <CssBaseline/>
        
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
          </ThemeProvider>
         </BrowserRouter>
    </div>
  );
}

export default App;
