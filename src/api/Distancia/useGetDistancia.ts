import { Distancia } from "@/bff/controllers/DNIT";
import { useQuery } from "react-query";
import { APIError } from "@/features/api/utils/makeError";

type DataType = ReturnType<typeof Distancia["GET"]>;

export const useGetDistancia = ({
  cidadeA,
  cidadeB,
}: {
  cidadeA: number;
  cidadeB: number;
}) => {
  const queryParams = new URLSearchParams({
    cidadeA: cidadeA.toString(),
    cidadeB: cidadeB.toString(),
  });

  return useQuery<DataType, APIError>(`distancia?${queryParams}`, () =>
    fetch(`/api/DNIT/distancia?${queryParams.toString()}`).then((res) =>
      res.json()
    )
  );
};
