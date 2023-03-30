import { Objects } from "@/bff/controllers/Freight";
import { APIError } from "@/features/api/utils/makeError";
import { useMemo } from "react";
import { useQuery } from "react-query";

type DataType = ReturnType<typeof Objects["GET"]>;

const getFreightObjects = (freightObjectsArray?: DataType) => {
  return freightObjectsArray
    ? freightObjectsArray.objects.map((freightObject) => ({
        label: freightObject.name + ` (${freightObject.weight} ton)`,
        id: freightObject.id.toString(),
      }))
    : [];
};

export const useGetFreightObjects = () => {
  const query: ReturnType<typeof useQuery<DataType, APIError>> & {
    options?: ReturnType<typeof getFreightObjects>;
  } = useQuery<DataType, APIError>("freightObjects", () =>
    fetch("/api/Freight/objects").then((res) => res.json())
  );

  query.options = useMemo(
    () => (query.data ? getFreightObjects(query.data) : []),
    [query.data]
  );

  return query;
};
