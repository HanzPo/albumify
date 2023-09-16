import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from "./App.jsx";
import "./index.css";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#f7fafc",
      secondary: "#00000",
      accent: "#000000"
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
