import {
  getFreightCost,
  getFreightObjects,
  getFreightOptions,
  getLoadedFreightCost,
} from "@/bff/models/Freight";

export const Options = {
  GET: () => getFreightOptions(),
};

export const Cost = {
  POST: (args: { cidadeAId: number; cidadeBId: number; freightType: number }) =>
    getFreightCost(args),
};

export const Objects = {
  GET: () => getFreightObjects(),
};

export const LoadedCost = {
  POST: (args: {
    cidadeAId: number;
    cidadeBId: number;
    objectIdsQuantity: { [key: number]: number };
  }) => getLoadedFreightCost(args),
};

export const LoadedCostBulk = {
  POST: (
    args: {
      cidadeAId: number;
      cidadeBId: number;
      objectIdsQuantity: { [key: number]: number };
    }[]
  ) => args.map((arg) => getLoadedFreightCost(arg)),
};
