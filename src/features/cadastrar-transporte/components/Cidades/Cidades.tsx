import { CircularProgress, Grid } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import React, { useContext } from "react";
import { CidadesForm } from "./components/CidadesForm/CidadesForm";
import { CidadesList } from "./components/CidadesList/CidadesList";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { CidadeForm, CidadesListForm } from "../../hooks/useCreateCidadesForm";
import { useGetCidades } from "@/api/Cidades/useGetCidades";
import { AutocompleteOption } from "@/common/utils/types";
import { CidadesObjetosContext } from "../../context/CidadesObjetosContext";

type Props = {
  cidadeForm: ReturnType<typeof useForm<CidadeForm>>;
  cidadesListForm: ReturnType<typeof useForm<CidadesListForm>>;
};

export const Cidades: React.FC<Props> = ({ cidadeForm, cidadesListForm }) => {
  const cidadesListFieldArray = useFieldArray<
    CidadesListForm,
    never,
    "value" | "id"
  >({
    control: cidadesListForm.control,
    // @ts-expect-error looks like there's an error with typing in react hook forms library
    // or there's not enough documentation to use it with TypeScript
    name: "cidades",
  });

  const cidadesListValues = useWatch({
    name: "cidades",
    control: cidadesListForm.control,
  });

  const onAddCidade = (values: CidadeForm) => {
    if (cidadesListValues.at(-1)?.value === values.cidadeToAdd) {
      cidadeForm.setError("cidadeToAdd", {
        message: "Você não pode adicionar duas cidades iguais em sequência",
      });
      return;
    }
    cidadesListFieldArray.append({ value: values.cidadeToAdd });
  };

  const { cidades } = useContext(CidadesObjetosContext);

  return (
    <Grid
      container
      display="grid"
      gridTemplateColumns="1fr 32px 1fr"
      gridTemplateRows="1fr"
      alignItems="center"
      columnGap={2}
    >
      {!cidades || cidades.isLoading ? (
        <Grid gridColumn={2}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid flex={1} display="flex" alignItems="center">
            <FormProvider {...cidadeForm}>
              <CidadesForm onSubmit={onAddCidade} />
            </FormProvider>
          </Grid>
          <SwapHorizIcon />
          <Grid flex={1} display="flex">
            <FormProvider {...cidadesListForm}>
              <CidadesList />
            </FormProvider>
          </Grid>
        </>
      )}
    </Grid>
  );
};
