import { Distancias } from "@/bff/controllers/DNIT";
import { useQuery } from "react-query";
import { APIError } from "@/features/api/utils/makeError";

type DataType = ReturnType<typeof Distancias["GET"]>;

export const useGetDistancias = () => {
  return useQuery<DataType, APIError>("distancias", () =>
    fetch("/api/DNIT/distancias").then((res) => res.json())
  );
};
