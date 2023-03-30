import { useGetFreightCost } from "@/api/Freight/useGetFreightCost";
import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import { formatNumberToCurrency } from "@/common/utils/currency";
import {
  Alert,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ResumeRow } from "./FreightResume.styles";

type Props = Pick<
  ReturnType<typeof useGetFreightCost>,
  "isLoading" | "data" | "error"
>;

export const FreightResume: React.FC<Props> = ({ data, isLoading, error }) => {
  const {
    palette: { grey },
  } = useTheme();

  const price = data ? formatNumberToCurrency(data.freightOption.price) : "";

  return (
    <Wrapper>
      {isLoading && <CircularProgress />}
      {!isLoading && error && <Alert severity="error">{error.message}</Alert>}
      {!data && !error && !isLoading && (
        <Typography variant="h6">
          Escolha os parametros e calcule ao lado, os resultados aparecerão aqui
        </Typography>
      )}
      {data && !error && !isLoading && (
        <Grid display="flex" flexDirection="column" width="100%" gap={2}>
          <Typography
            variant="body1"
            fontWeight="bold"
            margin={1}
            textAlign="center"
          >
            Descrição
          </Typography>
          <ResumeRow>
            <Typography variant="body1">Cidade de Origem</Typography>
            <Typography variant="body1" fontWeight="bold">
              {data.cidadeA.nome}
            </Typography>
          </ResumeRow>
          <ResumeRow>
            <Typography variant="body1">Cidade de Destino</Typography>
            <Typography variant="body1" fontWeight="bold">
              {data.cidadeB.nome}
            </Typography>
          </ResumeRow>
          <ResumeRow>
            <Typography variant="body1">Custo por km</Typography>
            <Typography variant="body1" fontWeight="bold">
              {price}
            </Typography>
          </ResumeRow>
          <ResumeRow>
            <Typography variant="body1">Distância</Typography>
            <Typography variant="body1" fontWeight="bold">
              {data.distancia} km
            </Typography>
          </ResumeRow>
          <ResumeRow>
            <Typography variant="body1">
              <span style={{ fontWeight: "bold" }}>Custo total</span>
              <sub style={{ margin: 5, color: grey["500"] }}>
                ({data.distancia}km x {price})
              </sub>
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {formatNumberToCurrency(data.totalPrice)}
            </Typography>
          </ResumeRow>
        </Grid>
      )}
    </Wrapper>
  );
};
