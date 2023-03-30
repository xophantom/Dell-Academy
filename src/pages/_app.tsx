import { DellLogo } from "@/common/components/DellLogo";
import { Sidebar } from "@/common/components/Sidebar";
import { dellTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const queryClient = new QueryClient();

export const RootGrid = styled(Grid)(() => ({
  height: "100vh",
  overflow: "hidden",
}));

export const SidebarGrid = styled(Grid)(() => ({
  background: "#eee",
  height: "100%",
  position: "fixed",
  left: 0,
  top: 0,
  width: 250,
}));

export const ContentGrid = styled(Grid)(() => ({
  marginLeft: 250,
  padding: 21,
}));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={dellTheme}>
      <QueryClientProvider client={queryClient}>
        <RootGrid container>
          <SidebarGrid item xs={3}>
            <DellLogo />
            <Sidebar />
          </SidebarGrid>
          <ContentGrid item xs={9} height="100%" overflow="auto">
            <Component {...pageProps} />
          </ContentGrid>
        </RootGrid>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
