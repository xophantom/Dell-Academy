import { formatNumberToCurrency } from "@/common/utils/currency";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ResumeRow } from "../Resume.styles";

type Props = {
  name: string;
  weight: number;
  quantity: number;
  totalOrderWeight: number;
  totalOrderCost: number;
};

export const ResumeItem: React.FC<Props> = ({
  quantity,
  name,
  weight,
  totalOrderCost,
  totalOrderWeight,
}) => {
  const totalWeight = quantity * weight;
  const costPerObjectType = (totalWeight / totalOrderWeight) * totalOrderCost;

  return (
    <ResumeRow>
      <span>
        <Typography display="inline" fontWeight="bold">
          {quantity}x
        </Typography>{" "}
        <Typography display="inline">
          {name}{" "}
          <sub style={{ color: grey[500] }}>
            ({quantity}x {weight}T)
          </sub>
        </Typography>
      </span>
      <Typography variant="body1" fontWeight="bold">
        <sub style={{ color: grey[500], fontWeight: "normal" }}>
          (Custo médio do grupo: {formatNumberToCurrency(costPerObjectType)})
        </sub>{" "}
        {totalWeight.toFixed(2)} tonelada{totalWeight === 1 ? "" : "s"}{" "}
      </Typography>
    </ResumeRow>
  );
};
