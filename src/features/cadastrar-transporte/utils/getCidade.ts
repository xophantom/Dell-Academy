import { useGetCidades } from "@/api/Cidades/useGetCidades";

export const getCidade = ({
  cidadeId,
  cidadesData,
}: {
  cidadeId: string;
  cidadesData: ReturnType<typeof useGetCidades>["data"];
}) => {
  return cidadesData?.cidades[Number(cidadeId)];
};
