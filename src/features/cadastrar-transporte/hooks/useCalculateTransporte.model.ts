import { CidadesListForm } from "./useCreateCidadesForm";

export const makeCityRoute = ({
  cidades,
  destinationId,
}: {
  cidades: CidadesListForm["cidades"];
  destinationId: string;
}) => {
  const cityDestinationIndex = cidades.findIndex(
    (cidade) => cidade.value === destinationId
  );

  if (cityDestinationIndex === -1) {
    throw new Error("Could not find the destination city!");
  }

  return cidades
    .slice(0, cityDestinationIndex + 1)
    .map((cidade) => Number(cidade.value));
};
