import { Options } from "@/bff/controllers/Freight";
import { APIError } from "@/features/api/utils/makeError";
import { useMemo } from "react";
import { useQuery } from "react-query";

type DataType = ReturnType<typeof Options["GET"]>;

const getFreightOptions = (freightOptionsArray?: DataType) => {
  return freightOptionsArray
    ? freightOptionsArray.freightOptions.map((freightOption) => ({
        label: freightOption.title + ` (${freightOption.capacity} ton)`,
        id: freightOption.id.toString(),
      }))
    : [];
};

export const useGetFreightOptions = () => {
  const query: ReturnType<typeof useQuery<DataType, APIError>> & {
    options?: ReturnType<typeof getFreightOptions>;
  } = useQuery<DataType, APIError>("freightOptions", () =>
    fetch("/api/Freight/options").then((res) => res.json())
  );

  query.options = useMemo(
    () => (query.data ? getFreightOptions(query.data) : []),
    [query.data]
  );

  return query;
};
