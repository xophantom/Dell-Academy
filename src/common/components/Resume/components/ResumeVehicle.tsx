import { formatNumberToCurrency } from "@/common/utils/currency";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ResumeRow } from "../Resume.styles";

type Props = {
  distancia: number;
  quantidade: number;
  nome: string;
  capacity: number;
  price: number;
};

export const ResumeVehicle: React.FC<Props> = ({
  quantidade,
  nome,
  price,
  capacity,
  distancia,
}) => {
  const pricePerCaminhao = price * distancia;
  const totalPrice = pricePerCaminhao * quantidade;

  return quantidade > 0 ? (
    <ResumeRow>
      <span>
        <Typography display="inline" fontWeight="bold">
          {quantidade}x
        </Typography>{" "}
        <Typography display="inline">
          {nome} ({capacity} ton){" "}
          <sub style={{ color: grey[500] }}>
            ({formatNumberToCurrency(price)} x {distancia}km ={" "}
            {formatNumberToCurrency(pricePerCaminhao)})
          </sub>
        </Typography>
      </span>
      <Typography variant="body1" fontWeight="bold">
        {formatNumberToCurrency(totalPrice)}
      </Typography>
    </ResumeRow>
  ) : null;
};
