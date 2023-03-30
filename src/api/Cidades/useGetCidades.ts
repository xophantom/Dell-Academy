import { Cidades } from "@/bff/controllers/DNIT";
import { useQuery } from "react-query";
import { APIError } from "@/features/api/utils/makeError";
import { useMemo } from "react";

type DataType = ReturnType<typeof Cidades["GET"]>;

const getCidadeOptions = (cidadesArray?: DataType) => {
  return cidadesArray
    ? cidadesArray.cidades.map((cidade, index) => ({
        label: cidade,
        id: index.toString(),
      }))
    : [];
};

export const useGetCidades = () => {
  const query: ReturnType<typeof useQuery<DataType, APIError>> & {
    options?: ReturnType<typeof getCidadeOptions>;
  } = useQuery<DataType, APIError>("cidades", () =>
    fetch("/api/DNIT/cidades").then((res) => res.json())
  );

  query.options = useMemo(
    () => (query.data ? getCidadeOptions(query.data) : []),
    [query.data]
  );

  return query;
};
