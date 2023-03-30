import { Cost } from "@/bff/controllers/Freight";
import { FreightForm } from "@/features/consultar-trechos-x-modalidades/hooks/useCreateFreightForm";
import { useMutation } from "react-query";
import { APIError } from "@/features/api/utils/makeError";

type DataType = ReturnType<typeof Cost["POST"]>;

export const useGetFreightCost = () => {
  return useMutation<DataType, APIError, FreightForm>(
    `cost`,
    ({ cidadeA, cidadeB, freightType }) => {
      const body: Parameters<typeof Cost["POST"]>[0] = {
        cidadeAId: Number(cidadeA),
        cidadeBId: Number(cidadeB),
        freightType: Number(freightType),
      };

      return fetch("api/Freight/cost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    }
  );
};
