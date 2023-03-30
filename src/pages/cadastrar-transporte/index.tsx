import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useCreateCidadesForm } from "@/features/cadastrar-transporte/hooks/useCreateCidadesForm";
import { Cidades } from "../../features/cadastrar-transporte/components/Cidades/Cidades";
import { Objetos } from "../../features/cadastrar-transporte/components/Objetos/Objetos";
import { useCreateObjetosForm } from "@/features/cadastrar-transporte/hooks/useCreateObjetosForm";
import { useGetCidades } from "@/api/Cidades/useGetCidades";
import { CidadesObjetosContextProvider } from "@/features/cadastrar-transporte/context/CidadesObjetosContext";
import { useGetFreightObjects } from "@/api/Freight/useGetFreightObjects";
import { Resume } from "@/common/components/Resume/Resume";
import { useCalculateTransporte } from "@/features/cadastrar-transporte/hooks/useCalculateTransporte";
import { useResetResume } from "@/features/cadastrar-transporte/hooks/useResetResume";
import { useSaveTransporte } from "@/features/cadastrar-transporte/hooks/useSaveTransporte";

const CadstrarTransporte = () => {
  const cidadesForms = useCreateCidadesForm();
  const objetosForms = useCreateObjetosForm();

  const cidadesQuery = useGetCidades();
  const objetosQuery = useGetFreightObjects();

  const { submit, data, error, isLoading, reset } = useCalculateTransporte({
    cidadesListForm: cidadesForms.cidadesListForm,
    objetosListForm: objetosForms.objetosListForm,
  });

  const onCalculate = () => {
    submit();
  };

  useResetResume({
    cidadesListForm: cidadesForms.cidadesListForm,
    objetosListForm: objetosForms.objetosListForm,
    data,
    isLoading,
    error,
    reset,
  });

  useSaveTransporte(data);

  return (
    <>
      <Head>
        <title>Dell Academy - Cadastrar transporte</title>
      </Head>
      <main>
        <Grid container flexDirection="column" alignItems="center" rowGap={4}>
          <Typography variant="h5">Cadastrar Transporte</Typography>
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            width="100%"
          >
            <CidadesObjetosContextProvider
              contextValue={{ cidades: cidadesQuery, objetos: objetosQuery }}
            >
              <Grid
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Cidades
                </Typography>
                <Cidades {...cidadesForms} />
              </Grid>
              <Grid
                flex={1}
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Objetos
                </Typography>
                <Objetos
                  {...objetosForms}
                  cidadesListFormControl={cidadesForms.cidadesListForm.control}
                />
              </Grid>
              <Grid
                flex={1}
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Resumo
                </Typography>
                <Resume
                  onCalculate={onCalculate}
                  data={data}
                  isLoading={isLoading}
                  error={error}
                />
              </Grid>
            </CidadesObjetosContextProvider>
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default CadstrarTransporte;
