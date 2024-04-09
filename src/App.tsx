import { Container } from "@mui/material";
import React from "react";
import Dashboard from "./components/dashboard";
import { ErrorBoundary } from "react-error-boundary";
const App: React.FC = (): React.ReactElement => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Container fixed>
        <Dashboard />
      </Container>
    </ErrorBoundary>
  );
};

export default App;
