import { LoadedCostBulk } from "@/bff/controllers/Freight";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeError } from "../../../features/api/utils/makeError";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!Array.isArray(req.body)) {
    return res
      .status(400)
      .json(makeError("O payload enviado deve ser um array!"));
  }

  for (const [index, item] of Object.entries(req.body)) {
    if (!item.cidadeAId && item.cidadeAId !== 0) {
      return res
        .status(400)
        .json(makeError(`Cidade A inválida no item ${index}`));
    }
    if (!item.cidadeBId && item.cidadeBId !== 0) {
      return res
        .status(400)
        .json(makeError(`Cidade B inválida no item ${index}`));
    }
    if (!item.objectIdsQuantity) {
      return res
        .status(400)
        .json(makeError(`Quantidade de objetos inválida no item ${index}`));
    }
  }

  res.status(200).json(LoadedCostBulk.POST(req.body));
}
