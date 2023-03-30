import { Resume } from "@/common/components/Resume/Resume";
import { LocalStorageManager } from "@/common/utils/localStorage";
import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const DadosEstatisticos = () => {
  const [transportes, setTransportes] = useState<
    ReturnType<typeof LocalStorageManager["getTransportes"]>
  >([]);

  useEffect(() => {
    setTransportes(LocalStorageManager.getTransportes());
  }, []);

  return (
    <>
      <Head>
        <title>Dell Academy - Dados estatisticos</title>
      </Head>
      <main>
        <Grid container flexDirection="column" alignItems="center" rowGap={4}>
          <Typography variant="h6">Dados estatísticos</Typography>
          <Grid
            container
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={2}
          >
            {transportes ? (
              transportes.map((transporte, index) => (
                <>
                  <Typography>
                    Transporte {index + 1} -{" "}
                    {new Date(transporte.timestamp).toLocaleString()}
                  </Typography>
                  <Resume
                    key={index}
                    data={transporte.content}
                    isLoading={false}
                    error={null}
                  />
                </>
              ))
            ) : (
              <Typography>Nenhum dado disponível</Typography>
            )}
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default DadosEstatisticos;
