import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components';
import Home from './pages/Home'
import ShowDetails from './pages/ShowDetails'
import Form from "./components/Form.jsx";

const Body = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
`;

function App() {

  // use state hooks
  const [darkMode, setDarkMode] = useState(true);
  const [openBooking, setOpenBooking] = useState({state: false, id: null});

  // use effect hooks


  return (

    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Body>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/show/:id" element={<ShowDetails setOpenBooking={setOpenBooking}/>} />
          </Routes>
        </BrowserRouter>
        {openBooking.state && <Form setOpenBooking={setOpenBooking} openBooking={openBooking}/>}
      </Body>
    </ThemeProvider>
  );
}

export default App;
