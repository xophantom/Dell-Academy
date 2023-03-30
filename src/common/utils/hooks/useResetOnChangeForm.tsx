import { useGetFreightCost } from "@/api/Freight/useGetFreightCost";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { FreightForm } from "@/features/consultar-trechos-x-modalidades/hooks/useCreateFreightForm";

export const useResetOnChangeForm = ({
  control,
  reset,
  data,
  isLoading,
  error,
}: {
  control: Control<FreightForm>;
  reset: () => void;
} & Pick<
  ReturnType<typeof useGetFreightCost>,
  "isLoading" | "data" | "error"
>) => {
  const watchedForm = useWatch({ control });
  const [requestedDataForm, setRequestedDataForm] = useState<
    typeof watchedForm | null
  >(null);

  useEffect(() => {
    if (data && !isLoading && !error) {
      setRequestedDataForm(watchedForm);
    }
  }, [data, setRequestedDataForm, watchedForm, isLoading, error]);

  useEffect(() => {
    if (
      data &&
      requestedDataForm &&
      !_.isEqual(watchedForm, requestedDataForm)
    ) {
      setRequestedDataForm(null);
      reset();
    }
  }, [data, watchedForm, requestedDataForm, setRequestedDataForm, reset]);
};
