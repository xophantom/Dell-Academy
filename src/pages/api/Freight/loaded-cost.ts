import { LoadedCost } from "@/bff/controllers/Freight";
import { getRawFreightOptions } from "@/bff/data-sources/Freight";
import { getLoadedFreightCost } from "@/bff/models/Freight";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeError } from "../../../features/api/utils/makeError";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.cidadeAId && req.body.cidadeAId !== 0) {
    return res.status(400).json(makeError("Cidade A inválida"));
  }
  if (!req.body.cidadeBId && req.body.cidadeBId !== 0) {
    return res.status(400).json(makeError("Cidade B inválida"));
  }
  if (!req.body.objectIdsQuantity) {
    return res.status(400).json(makeError("Quantidade de objetos inválida"));
  }

  res.status(200).json(LoadedCost.POST(req.body));
}
