import { CidadesDistancias } from "@/bff/controllers/DNIT";
import { useQuery } from "react-query";
import { APIError } from "@/features/api/utils/makeError";

type DataType = ReturnType<typeof CidadesDistancias["GET"]>;

export const useGetCidadesDistancias = () => {
  return useQuery<DataType, APIError>("cidadesDistancias", () =>
    fetch("/api/DNIT/cidades-distancias").then((res) => res.json())
  );
};
