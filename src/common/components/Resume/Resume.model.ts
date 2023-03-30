import { useCalculateTransporte } from "@/features/cadastrar-transporte/hooks/useCalculateTransporte";
import { ResumeCity } from "./components/ResumeCity";

type TotalData = {
  totalCost: number;
  totalCostPerKm: number;
  totalFreightItems: number;
  totalItems: number;
  totalLoad: number;
};

const getItemResumeData = ({
  freightItem,
  distancia,
}: {
  freightItem: NonNullable<
    ReturnType<typeof useCalculateTransporte>["data"]
  >[0]["freightsToOrder"][0];
  distancia: number;
}): React.ComponentProps<typeof ResumeCity>["freightItems"][0] => {
  return {
    capacity: freightItem.capacity,
    distancia,
    nome: freightItem.title,
    price: freightItem.price,
    quantidade: freightItem.quantity,
  };
};

const getItemsQuantityInTransporte = (
  transporte: NonNullable<ReturnType<typeof useCalculateTransporte>["data"]>[0]
) => {
  return Object.values(transporte.selectedObjects).reduce(
    (previousValue, selectedObject) => previousValue + selectedObject.quantity,
    0
  );
};

const getFreightQuantity = (
  freightItems: ReturnType<typeof getCityResumeData>["freightItems"]
) => {
  return freightItems.reduce(
    (previousValue, freightItem) => previousValue + freightItem.quantidade,
    0
  );
};

export const getCityResumeData = (
  transporte: NonNullable<ReturnType<typeof useCalculateTransporte>["data"]>[0]
): React.ComponentProps<typeof ResumeCity> => {
  const freightItems = Object.values(transporte.freightsToOrder).map(
    (freight) =>
      getItemResumeData({
        freightItem: freight,
        distancia: transporte.distancia,
      })
  );

  return {
    cidadeOrigem: transporte.cidadeA.nome,
    cidadeDestino: transporte.cidadeB.nome,
    distancia: transporte.distancia,
    totalCost: transporte.totalCost,
    totalCostPerKm: transporte.costPerKm,
    freightItems,
    totalFreightItems: getFreightQuantity(freightItems),
    totalItems: getItemsQuantityInTransporte(transporte),
    objects: Object.values(transporte.selectedObjects).map(
      (selectedObject) => ({
        ...selectedObject,
        totalOrderWeight: transporte.totalLoad,
        totalOrderCost: transporte.totalCost,
      })
    ),
    totalLoad: transporte.totalLoad,
  };
};

export const getResumeTotalData = ({
  citiesResumeData,
}: {
  citiesResumeData: ReturnType<typeof getCityResumeData>[];
}): TotalData => {
  return {
    totalCost: citiesResumeData.reduce(
      (previousValue, cityResumeData) =>
        previousValue + cityResumeData.totalCost,
      0
    ),
    totalCostPerKm: citiesResumeData.reduce(
      (previousValue, cityResumeData) =>
        previousValue + cityResumeData.totalCostPerKm,
      0
    ),
    totalFreightItems: citiesResumeData.reduce(
      (previousValue, cityResumeData) =>
        previousValue + cityResumeData.totalFreightItems,
      0
    ),
    totalItems: citiesResumeData.reduce(
      (previousValue, cityResumeData) =>
        previousValue + cityResumeData.totalItems,
      0
    ),
    totalLoad: citiesResumeData.reduce(
      (previousValue, cityResumeData) =>
        previousValue + cityResumeData.totalLoad,
      0
    ),
  };
};
