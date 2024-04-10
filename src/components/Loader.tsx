import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: "250px",
  alignItems: "center",
  justifyContent: "center",
}));
export const Loader: React.FC = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};
