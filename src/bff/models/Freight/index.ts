import {
  getRawFreightObjects,
  getRawFreightOptions,
} from "@/bff/data-sources/Freight";
import { removeNegativePart } from "@/bff/utils/numeric";
import { getDistancia } from "../DNIT";

export const getFreightOptions = () => ({
  freightOptions: getRawFreightOptions(),
});

export const getFreightOption = ({ id }: { id: number }) => ({
  freightOption: getRawFreightOptions().find(
    (freightOption) => freightOption.id === id
  ),
});

export const getFreightCost = ({
  cidadeAId,
  cidadeBId,
  freightType,
}: {
  cidadeAId: number;
  cidadeBId: number;
  freightType: number;
}) => {
  const { cidadeA, cidadeB, distancia } = getDistancia({
    cidadeA: cidadeAId,
    cidadeB: cidadeBId,
  });
  const { freightOption } = getFreightOption({ id: freightType });

  if (!freightOption) {
    throw new Error("Could not find the selected freight option");
  }

  return {
    cidadeA,
    cidadeB,
    freightOption,
    distancia,
    totalPrice: distancia * freightOption?.price,
  };
};

export const getFreightObjects = () => ({
  objects: getRawFreightObjects(),
});

const getSelectedObjects = ({
  objectIdsQuantity,
}: {
  objectIdsQuantity: { [key: number]: number };
}) => {
  const { objects } = getFreightObjects();

  const selectedObjects: {
    [key: number]: ReturnType<typeof getFreightObjects>["objects"][0] & {
      quantity: number;
    };
  } = {};

  Object.entries(objectIdsQuantity).forEach(
    ([objectId, quantity]: [string, number]) => {
      const numericObjectId = Number(objectId);
      const rawObject = objects.find((object) => object.id === numericObjectId);

      if (!rawObject) {
        throw new Error("The object with the provided id could not be found!");
      }

      selectedObjects[numericObjectId] = {
        ...rawObject,
        quantity,
      };
    }
  );

  return { selectedObjects };
};

const getTotalLoad = ({
  selectedObjects,
}: {
  selectedObjects: {
    [key: number]: ReturnType<typeof getFreightObjects>["objects"][0] & {
      quantity: number;
    };
  };
}) => {
  return {
    selectedObjects,
    totalLoad: Object.values(selectedObjects).reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.weight * currentValue.quantity;
      },
      0
    ),
  };
};

const getBangForBuckTurningPoint = ({
  cheaperFreightOption,
  freightOption,
}: {
  cheaperFreightOption: ReturnType<typeof getRawFreightOptions>[0];
  freightOption: ReturnType<typeof getRawFreightOptions>[0];
}) => {
  if (freightOption.price < cheaperFreightOption.price) {
    throw new Error(
      "You reversed the freight prices! The cheapest one costs more than the other!"
    );
  }

  // se o valor restante da carga a se carregar for maior que o retorno dessa funcao
  // vale a pena pegar o mais caro
  // se for igual ou menor, vale a pena pegar o mais barato
  return (
    Math.floor(freightOption.price / cheaperFreightOption.price) *
    cheaperFreightOption.capacity
  );
};

export const getLoadedFreightCost = ({
  cidadeAId,
  cidadeBId,
  objectIdsQuantity,
}: {
  cidadeAId: number;
  cidadeBId: number;
  objectIdsQuantity: { [key: number]: number };
}) => {
  const { cidadeA, cidadeB, distancia } = getDistancia({
    cidadeA: cidadeAId,
    cidadeB: cidadeBId,
  });
  const { freightOptions } = getFreightOptions();
  const { selectedObjects } = getSelectedObjects({ objectIdsQuantity });
  const { totalLoad } = getTotalLoad({ selectedObjects });

  let remainingLoad = totalLoad;
  const freightsToOrder: {
    [key: number]: typeof freightOptions["0"] & { quantity: number };
  } = {};

  freightOptions.forEach(
    (freightOption) =>
      (freightsToOrder[freightOption.id] = { ...freightOption, quantity: 0 })
  );

  const sortedFreights = freightOptions.sort((a, b) => b.price - a.price);

  const cheapestFreight = sortedFreights.at(-1);

  if (cheapestFreight && remainingLoad < cheapestFreight.capacity) {
    freightsToOrder[cheapestFreight.id].quantity += 1;
  } else {
    for (const [index, selectedFreight] of sortedFreights.entries()) {
      const nextFreight = sortedFreights[index + 1];

      freightsToOrder[selectedFreight.id].quantity = Math.floor(
        remainingLoad / selectedFreight.capacity
      );
      remainingLoad -=
        freightsToOrder[selectedFreight.id].quantity * selectedFreight.capacity;

      // logica pra ver se vale mais a pena pegar mais um do maior
      if (nextFreight) {
        // se o valor restante da carga a se carregar for maior que esse valor
        // vale a pena pegar o mais caro
        // se for igual ou menor, vale a pena pegar o mais barato
        const costBenefitCoefficient = getBangForBuckTurningPoint({
          freightOption: selectedFreight,
          cheaperFreightOption: nextFreight,
        });

        if (remainingLoad > costBenefitCoefficient) {
          freightsToOrder[selectedFreight.id].quantity += 1;
          remainingLoad -= selectedFreight.capacity;
        }
      }

      // cleanup na carga restante se tiver zerado
      remainingLoad = removeNegativePart(remainingLoad);
    }
  }

  const costPerKm = Object.values(freightsToOrder).reduce(
    (previousValue, freight) =>
      previousValue + freight.price * freight.quantity,
    0
  );

  const totalCost = costPerKm * distancia;

  return {
    selectedObjects,
    freightsToOrder,
    costPerKm,
    totalCost,
    totalLoad,
    cidadeA,
    cidadeB,
    distancia,
  };
};
