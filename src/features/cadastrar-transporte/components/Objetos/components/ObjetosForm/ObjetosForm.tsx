import { FormErrors } from "@/common/components/FormErrors/FormErrors";
import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import { CidadesObjetosContext } from "@/features/cadastrar-transporte/context/CidadesObjetosContext";
import { CidadesListForm } from "@/features/cadastrar-transporte/hooks/useCreateCidadesForm";
import { ObjetoForm } from "@/features/cadastrar-transporte/hooks/useCreateObjetosForm";
import { AutocompleteOption } from "@/common/utils/types";
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useRef } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import { useGetAvailableCidadeOptions } from "../../hooks/useGetAvailableCidadeOptions";

type Props = {
  onSubmit: (values: ObjetoForm) => void;
  cidadesListFormControl: Control<CidadesListForm>;
};

export const ObjetosForm: React.FC<Props> = ({
  onSubmit,
  cidadesListFormControl,
}) => {
  const form = useFormContext<ObjetoForm>();

  const { objetos, cidades } = useContext(CidadesObjetosContext);

  const selectedCidadesOptions = useGetAvailableCidadeOptions({
    cidadesListFormControl,
    cidadesOptions: cidades?.options ?? [],
  });

  const getOptionLabel = (value: string, options: AutocompleteOption[]) =>
    options.find((option) => option.id === value)?.label ?? "";

  return (
    <form
      style={{ width: "100%", display: "flex" }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Wrapper>
        {selectedCidadesOptions.length >= 2 ? (
          <>
            <FormErrors />
            <Controller
              name="objetoToAdd"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete<string>
                  disablePortal
                  fullWidth
                  id="objeto-to-add"
                  options={objetos?.options?.map((option) => option.id) ?? []}
                  value={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Objeto"
                      error={!!form.formState.errors.objetoToAdd}
                    />
                  )}
                  getOptionLabel={(value) =>
                    getOptionLabel(value, objetos?.options ?? [])
                  }
                  onChange={(_e, value) => {
                    form.setValue("objetoToAdd", value ?? "");
                  }}
                />
              )}
            />
            <TextField
              {...form.register("quantity", { required: true })}
              fullWidth
              error={!!form.formState.errors.quantity}
              type="number"
              label="Quantidade"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Controller
              name="cidadeDestino"
              control={form.control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="cidade-destino"
                  value={field.value}
                  options={selectedCidadesOptions.map((option) => option.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cidade de destino"
                      error={!!form.formState.errors.cidadeDestino}
                    />
                  )}
                  getOptionLabel={(value) =>
                    getOptionLabel(value, selectedCidadesOptions)
                  }
                  onChange={(_e, value) => {
                    form.setValue("cidadeDestino", value ?? "");
                  }}
                />
              )}
            />
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              type="submit"
            >
              Adicionar
            </Button>
          </>
        ) : (
          <Typography variant="body1">
            Por favor, selecione duas ou mais cidades
          </Typography>
        )}
      </Wrapper>
    </form>
  );
};
