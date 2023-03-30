import { Cost } from "@/bff/controllers/Freight";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeError } from "../../../features/api/utils/makeError";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.cidadeAId && req.body.cidadeAId !== 0) {
    return res.status(400).json(makeError("Cidade A inválida"));
  }
  if (!req.body.cidadeBId && req.body.cidadeBId !== 0) {
    return res.status(400).json(makeError("Cidade B inválida"));
  }
  if (!req.body.freightType && req.body.freightType !== 0) {
    return res.status(400).json(makeError("Modalidade de transporte inválido"));
  }

  res.status(200).json(Cost.POST(req.body));
}
