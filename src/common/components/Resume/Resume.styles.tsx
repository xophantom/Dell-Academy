import React, { ReactNode } from "react";
import { Grid, useTheme } from "@mui/material";

type Props = { children: ReactNode; isHeader?: boolean };

export const ResumeRow: React.FC<Props> = ({ children, isHeader }) => {
  const {
    palette: { grey },
  } = useTheme();

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px dashed ${grey["400"]}`}
      padding="1px"
      paddingLeft={isHeader ? 0 : 2}
      width="100%"
    >
      {children}
    </Grid>
  );
};
