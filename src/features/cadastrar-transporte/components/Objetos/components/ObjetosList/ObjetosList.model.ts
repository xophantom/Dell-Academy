import { useGetCidades } from "@/api/Cidades/useGetCidades";
import { useGetFreightObjects } from "@/api/Freight/useGetFreightObjects";
import {
  ObjetoForm,
  ObjetosListForm,
} from "@/features/cadastrar-transporte/hooks/useCreateObjetosForm";
import { getCidade } from "@/features/cadastrar-transporte/utils/getCidade";

export const getObjectTitle = ({
  objetoValue,
  objetosData,
  cidadesData,
}: {
  objetoValue: ObjetosListForm["objetos"][0];
  objetosData: ReturnType<typeof useGetFreightObjects>["data"];
  cidadesData: ReturnType<typeof useGetCidades>["data"];
}) => {
  const object = objetosData?.objects.find(
    (object) => object.id.toString() === objetoValue.value
  );

  return `${object?.name} (${object?.weight} ton) - Quantidade: ${
    objetoValue.quantity
  } - Destino: ${getCidade({
    cidadeId: objetoValue.cidadeDestino,
    cidadesData,
  })}`;
};
