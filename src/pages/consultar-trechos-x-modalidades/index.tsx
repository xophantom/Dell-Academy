import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { FormProvider } from "react-hook-form";
import { FreightForm } from "../../features/consultar-trechos-x-modalidades/components/freight-form/FreightForm";
import { FreightResume } from "../../features/consultar-trechos-x-modalidades/components/freight-resume/FreightResume";
import { useCreateFreightForm } from "@/features/consultar-trechos-x-modalidades/hooks/useCreateFreightForm";
import { useGetFreightCost } from "@/api/Freight/useGetFreightCost";
import { useResetOnChangeForm } from "@/common/utils/hooks/useResetOnChangeForm";

const ConsultarTrechosModalidades = () => {
  const form = useCreateFreightForm();

  const { mutate, data, isLoading, error, reset } = useGetFreightCost();

  useResetOnChangeForm({
    control: form.control,
    reset,
    data,
    isLoading,
    error,
  });

  return (
    <>
      <Head>
        <title>Dell Academy - Consultar trechos x modalidades</title>
      </Head>
      <main>
        <Grid container flexDirection="column" alignItems="center" rowGap={4}>
          <Typography variant="h6">Consultar Trechos x Modalidades</Typography>
          <Grid
            container
            display="grid"
            gridTemplateColumns="1fr 32px 1fr"
            gridTemplateRows="1fr"
            alignItems="center"
            columnGap={2}
          >
            <Grid flex={1}>
              <FormProvider {...form}>
                <FreightForm onSubmit={(data) => mutate(data)} />
              </FormProvider>
            </Grid>
            <SwapHorizIcon />
            <Grid flex={1} display="flex" height="100%">
              <FreightResume data={data} isLoading={isLoading} error={error} />
            </Grid>
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default ConsultarTrechosModalidades;
