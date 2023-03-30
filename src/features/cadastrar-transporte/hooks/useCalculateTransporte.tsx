import { useGetFreightLoadedCostBulk } from "@/api/Freight/useGetFreightLoadedCostBulk";
import { makeCityRoute } from "./useCalculateTransporte.model";
import { useCreateCidadesForm } from "./useCreateCidadesForm";
import { useCreateObjetosForm } from "./useCreateObjetosForm";

export const useCalculateTransporte = ({
  objetosListForm,
  cidadesListForm,
}: {
  objetosListForm: ReturnType<typeof useCreateObjetosForm>["objetosListForm"];
  cidadesListForm: ReturnType<typeof useCreateCidadesForm>["cidadesListForm"];
}) => {
  const query = useGetFreightLoadedCostBulk();

  const { mutate } = query;

  type Body = Parameters<typeof mutate>[0][0];

  const submit = () => {
    const { objetos } = objetosListForm.getValues();
    const { cidades } = cidadesListForm.getValues();

    type ObjectWithRoute = {
      id: number;
      quantity: number;
      route: number[];
    };

    const objectsWithRoute: ObjectWithRoute[] = [];

    objetos.forEach((objeto) => {
      const objectWithRoute: ObjectWithRoute = {
        id: Number(objeto.value),
        quantity: Number(objeto.quantity),
        route: makeCityRoute({ cidades, destinationId: objeto.cidadeDestino }),
      };

      objectsWithRoute.push(objectWithRoute);
    });

    const bodies: Body[] = [];

    cidades.forEach((cidade, index) => {
      if (index === 0) {
        return;
      }
      const previousCityId = Number(cidades[index - 1].value);
      const actualCityId = Number(cidade.value);

      const objectsRoutedThroughThisCity = objectsWithRoute.filter(
        (objectWithRoute) => objectWithRoute.route.includes(actualCityId)
      );

      const objectIdsWithQuantity: Body["objectIdsQuantity"] = {};

      objectsRoutedThroughThisCity.forEach((object) => {
        if (isNaN(objectIdsWithQuantity[object.id])) {
          objectIdsWithQuantity[object.id] = object.quantity;
        } else {
          objectIdsWithQuantity[object.id] += object.quantity;
        }
      });

      const body: Body = {
        cidadeAId: previousCityId,
        cidadeBId: actualCityId,
        objectIdsQuantity: objectIdsWithQuantity,
      };

      bodies.push(body);
    });

    return mutate(bodies);
  };

  return { ...query, submit };
};
