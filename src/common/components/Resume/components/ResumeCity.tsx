import { formatNumberToCurrency } from "@/common/utils/currency";
import { Grid, Typography, useTheme } from "@mui/material";
import { ResumeRow } from "../Resume.styles";
import { ResumeItem } from "./ResumeItem";
import { ResumeVehicle } from "./ResumeVehicle";

type Props = {
  cidadeOrigem: string;
  cidadeDestino: string;
  distancia: number;
  freightItems: React.ComponentProps<typeof ResumeVehicle>[];
  objects: React.ComponentProps<typeof ResumeItem>[];
  totalCost: number;
  totalCostPerKm: number;
  totalLoad: number;
  totalItems: number;
  totalFreightItems: number;
};

export const ResumeCity: React.FC<Props> = ({
  cidadeOrigem,
  cidadeDestino,
  distancia,
  freightItems,
  objects,
  totalCost,
  totalCostPerKm,
  totalLoad,
  totalFreightItems,
  totalItems,
}) => {
  const {
    palette: { grey },
  } = useTheme();

  return (
    <Grid display="flex" width="100%" flexDirection="column" gap={1}>
      <ResumeRow isHeader>
        <span>
          <Typography display="inline" fontWeight="bold">
            De {cidadeOrigem} para {cidadeDestino}
          </Typography>{" "}
          <Typography display="inline">
            <sub style={{ color: grey[700] }}>({distancia}km)</sub>
          </Typography>
        </span>
      </ResumeRow>
      <ResumeRow>
        <Typography display="inline" fontWeight="bold">
          Itens
        </Typography>
      </ResumeRow>
      {objects.map((object, index) => (
        <ResumeItem key={index} {...object} />
      ))}
      <ResumeRow>
        <Typography display="inline" fontWeight="bold">
          Veículos
        </Typography>
      </ResumeRow>
      {freightItems.map((freightItem, index) => (
        <ResumeVehicle key={index} {...freightItem} />
      ))}
      <ResumeRow isHeader>
        <Typography display="inline" fontWeight="bold">
          Custo por km
        </Typography>
        <Typography display="inline" fontWeight="bold">
          {formatNumberToCurrency(totalCostPerKm)}
        </Typography>
      </ResumeRow>
      <ResumeRow isHeader>
        <Typography display="inline" fontWeight="bold">
          Custo por trecho
        </Typography>
        <Typography display="inline" fontWeight="bold">
          {formatNumberToCurrency(totalCost)}
        </Typography>
      </ResumeRow>
      <ResumeRow isHeader>
        <Typography display="inline" fontWeight="bold">
          Total de itens
        </Typography>
        <Typography display="inline" fontWeight="bold">
          {totalItems} ite
          {totalItems === 1 ? "m" : "ns"}
        </Typography>
      </ResumeRow>
      <ResumeRow isHeader>
        <Typography display="inline" fontWeight="bold">
          Total de veículos para transporte
        </Typography>
        <Typography display="inline" fontWeight="bold">
          {totalFreightItems} veículo
          {totalFreightItems === 1 ? "" : "s"}
        </Typography>
      </ResumeRow>
      <ResumeRow isHeader>
        <Typography display="inline" fontWeight="bold">
          Peso por trecho
        </Typography>
        <Typography display="inline" fontWeight="bold">
          {totalLoad.toFixed(2)} tonelada
          {totalLoad === 1 ? "" : "s"}
        </Typography>
      </ResumeRow>
    </Grid>
  );
};
