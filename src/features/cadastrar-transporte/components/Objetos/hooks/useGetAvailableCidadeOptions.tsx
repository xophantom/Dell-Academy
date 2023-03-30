import { CidadesListForm } from "@/features/cadastrar-transporte/hooks/useCreateCidadesForm";
import { AutocompleteOption } from "@/common/utils/types";
import { Control, useWatch } from "react-hook-form";

export const useGetAvailableCidadeOptions = ({
  cidadesOptions,
  cidadesListFormControl,
}: {
  cidadesOptions: AutocompleteOption[];
  cidadesListFormControl: Control<CidadesListForm>;
}) => {
  const cidadesList = useWatch({
    control: cidadesListFormControl,
    name: "cidades",
  });

  const cidadesListIds = cidadesList.map(
    (cidadeListItem) => cidadeListItem.value
  );

  return cidadesOptions.filter((cidadeOption) =>
    cidadesListIds.find((cidadeListId) => cidadeListId === cidadeOption.id)
  );
};
