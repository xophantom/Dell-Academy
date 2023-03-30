import { CircularProgress, Grid } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import React, { useContext, useEffect } from "react";
import { ObjetosForm } from "./components/ObjetosForm/ObjetosForm";
import { ObjetosList } from "./components/ObjetosList/ObjetosList";
import {
  Control,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { ObjetoForm, ObjetosListForm } from "../../hooks/useCreateObjetosForm";
import { CidadesListForm } from "../../hooks/useCreateCidadesForm";
import { CidadesObjetosContext } from "../../context/CidadesObjetosContext";

type Props = {
  objetoForm: ReturnType<typeof useForm<ObjetoForm>>;
  objetosListForm: ReturnType<typeof useForm<ObjetosListForm>>;
  cidadesListFormControl: Control<CidadesListForm>;
};

export const Objetos: React.FC<Props> = ({
  objetoForm,
  objetosListForm,
  cidadesListFormControl,
}) => {
  const objetosListFieldArray = useFieldArray<
    ObjetosListForm,
    never,
    "value" | "id"
  >({
    control: objetosListForm.control,
    // @ts-expect-error looks like there's an error with typing in react hook forms library
    // or there's not enough documentation to use it with TypeScript
    name: "objetos",
  });

  const cidadesListValues = useWatch({
    name: "cidades",
    control: cidadesListFormControl,
  });

  const objetosListValues = useWatch({
    name: "objetos",
    control: objetosListForm.control,
  });

  useEffect(() => {
    objetoForm.reset();
    objetosListForm.reset();
  }, [cidadesListValues, objetosListForm, objetoForm]);

  const onAddObjeto = ({
    objetoToAdd,
    quantity,
    cidadeDestino,
  }: ObjetoForm) => {
    if (
      objetosListValues.find(
        (objeto) =>
          objeto.value === objetoToAdd && objeto.cidadeDestino === cidadeDestino
      )
    ) {
      return objetoForm.setError("objetoToAdd", {
        message:
          "Você não pode adicionar dois objetos iguais pro mesmo destino. Se você quer alterar a quantidade, remova o objeto e adicione novamente",
      });
    }
    if (cidadesListValues[0].value === cidadeDestino) {
      return objetoForm.setError("cidadeDestino", {
        message: "Você não pode enviar um objeto pra sua cidade de origem",
      });
    }
    objetosListFieldArray.append({
      value: objetoToAdd,
      quantity,
      cidadeDestino,
    });
  };

  const { objetos } = useContext(CidadesObjetosContext);

  return (
    <Grid
      container
      display="grid"
      gridTemplateColumns="1fr 32px 1fr"
      gridTemplateRows="1fr"
      alignItems="center"
      columnGap={2}
    >
      {!objetos || objetos.isLoading ? (
        <Grid gridColumn={2}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid flex={1} display="flex" alignItems="center">
            <FormProvider {...objetoForm}>
              <ObjetosForm
                onSubmit={onAddObjeto}
                cidadesListFormControl={cidadesListFormControl}
              />
            </FormProvider>
          </Grid>
          <SwapHorizIcon />
          <Grid flex={1} display="flex">
            <FormProvider {...objetosListForm}>
              <ObjetosList />
            </FormProvider>
          </Grid>
        </>
      )}
    </Grid>
  );
};
