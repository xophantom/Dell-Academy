import _ from "lodash";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { useCalculateTransporte } from "./useCalculateTransporte";
import { useCreateCidadesForm } from "./useCreateCidadesForm";
import { useCreateObjetosForm } from "./useCreateObjetosForm";

export const useResetResume = ({
  cidadesListForm,
  objetosListForm,
  reset,
  data,
  isLoading,
  error,
}: {
  cidadesListForm: ReturnType<typeof useCreateCidadesForm>["cidadesListForm"];
  objetosListForm: ReturnType<typeof useCreateObjetosForm>["objetosListForm"];
} & Pick<
  ReturnType<typeof useCalculateTransporte>,
  "data" | "isLoading" | "error" | "reset"
>) => {
  const cidadesFormWatch = useWatch({ control: cidadesListForm.control });
  const objetosFormWatch = useWatch({ control: objetosListForm.control });
  const [requestedCidadesForm, setRequestedCidadesForm] = useState<
    typeof cidadesFormWatch | null
  >(null);
  const [requestedObjetosForm, setRequestedObjetosForm] = useState<
    typeof objetosFormWatch | null
  >(null);

  useEffect(() => {
    if (data && !isLoading && !error) {
      setRequestedCidadesForm(cidadesFormWatch);
      setRequestedObjetosForm(objetosFormWatch);
    }
  }, [
    data,
    setRequestedCidadesForm,
    setRequestedObjetosForm,
    objetosFormWatch,
    cidadesFormWatch,
    isLoading,
    error,
  ]);

  useEffect(() => {
    if (
      (!!requestedCidadesForm || !!requestedObjetosForm) &&
      (!_.isEqual(cidadesFormWatch, requestedCidadesForm) ||
        !_.isEqual(objetosFormWatch, requestedObjetosForm)) &&
      (data || isLoading || error)
    ) {
      setRequestedCidadesForm(null);
      setRequestedObjetosForm(null);
      reset();
    }
  }, [
    cidadesFormWatch,
    objetosFormWatch,
    requestedCidadesForm,
    requestedObjetosForm,
    reset,
    data,
    isLoading,
    error,
  ]);
};
