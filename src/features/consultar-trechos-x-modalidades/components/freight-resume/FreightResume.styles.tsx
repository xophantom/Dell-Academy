import React, { ReactNode } from "react";
import { Grid, useTheme } from "@mui/material";

export const ResumeRow = ({ children }: { children: ReactNode }) => {
  const {
    palette: { grey },
  } = useTheme();

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px dashed ${grey["300"]}`}
      padding="1px"
    >
      {children}
    </Grid>
  );
};
