import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useCalculateTransporte } from "@/features/cadastrar-transporte/hooks/useCalculateTransporte";
import { ResumeCity } from "./components/ResumeCity";
import { getCityResumeData, getResumeTotalData } from "./Resume.model";
import { ResumeRow } from "./Resume.styles";
import { formatNumberToCurrency } from "@/common/utils/currency";

type Props = Pick<
  ReturnType<typeof useCalculateTransporte>,
  "data" | "isLoading" | "error"
> & {
  onCalculate?: (objetosFormList: any) => void;
};

export const Resume: React.FC<Props> = ({
  onCalculate,
  data,
  isLoading,
  error,
}) => {
  const citiesResumeData =
    data?.map((transporte) => getCityResumeData(transporte)) ?? [];

  const totalResumeData = getResumeTotalData({
    citiesResumeData,
  });

  return (
    <Wrapper gap={3}>
      {isLoading && <CircularProgress />}
      {error && !isLoading && <Alert severity="error">{error.message}</Alert>}
      {data && !isLoading && (
        <>
          {citiesResumeData.map((cityResumeData, index) => (
            <ResumeCity key={index} {...cityResumeData} />
          ))}
          <Typography fontWeight="bold">Total</Typography>

          <Grid display="flex" width="100%" flexDirection="column" gap={1}>
            <ResumeRow isHeader>
              <Typography display="inline" fontWeight="bold">
                Custo total por km
              </Typography>
              <Typography display="inline" fontWeight="bold">
                {formatNumberToCurrency(totalResumeData.totalCostPerKm)}
              </Typography>
            </ResumeRow>
            <ResumeRow isHeader>
              <Typography display="inline" fontWeight="bold">
                Custo total
              </Typography>
              <Typography display="inline" fontWeight="bold">
                {formatNumberToCurrency(totalResumeData.totalCost)}
              </Typography>
            </ResumeRow>
            <ResumeRow isHeader>
              <Typography display="inline" fontWeight="bold">
                Total de itens
              </Typography>
              <Typography display="inline" fontWeight="bold">
                {totalResumeData.totalItems} ite
                {totalResumeData.totalItems === 1 ? "m" : "ns"}
              </Typography>
            </ResumeRow>
            <ResumeRow isHeader>
              <Typography display="inline" fontWeight="bold">
                Total de veículos para transporte
              </Typography>
              <Typography display="inline" fontWeight="bold">
                {totalResumeData.totalFreightItems} veículo
                {totalResumeData.totalFreightItems === 1 ? "" : "s"}
              </Typography>
            </ResumeRow>
            <ResumeRow isHeader>
              <Typography display="inline" fontWeight="bold">
                Peso total
              </Typography>
              <Typography display="inline" fontWeight="bold">
                {totalResumeData.totalLoad.toFixed(2)} tonelada
                {totalResumeData.totalLoad === 1 ? "" : "s"}
              </Typography>
            </ResumeRow>
          </Grid>
        </>
      )}
      {onCalculate && (
        <Button
          startIcon={<CalculateIcon />}
          variant="contained"
          color="primary"
          onClick={onCalculate}
        >
          Calcular
        </Button>
      )}
    </Wrapper>
  );
};
