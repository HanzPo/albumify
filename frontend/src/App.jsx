import { useState } from "react";
import "./App.css";
import { Button, ButtonGroup, Spinner } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CoverOutput from "./pages/CoverOutput";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState();

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>Not found</h1>} />
        <Route path="/output" element={<CoverOutput />} />
      </Routes>
    </>
  );
};

export default App;
