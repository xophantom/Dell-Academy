import { LoadedCostBulk } from "@/bff/controllers/Freight";
import { useMutation } from "react-query";
import { APIError } from "@/features/api/utils/makeError";

type DataType = ReturnType<typeof LoadedCostBulk["POST"]>;

type BodyType = Parameters<typeof LoadedCostBulk["POST"]>[0];

export const useGetFreightLoadedCostBulk = () => {
  return useMutation<DataType, APIError, BodyType>(
    `loaded-cost-bulk`,
    (body) => {
      return fetch("api/Freight/loaded-cost-bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
    }
  );
};
