import { Grid } from "@mui/material";
import { ReactNode } from "react";

export const Wrapper: React.FC<{
  children: ReactNode;
  gap?: number | string;
}> = ({ children, gap }) => (
  <Grid
    container
    direction="column"
    padding={2}
    margin={2}
    border="1px solid #ccc"
    borderRadius={2}
    alignItems="center"
    rowGap={gap ?? 2}
    height="100%"
  >
    {children}
  </Grid>
);
