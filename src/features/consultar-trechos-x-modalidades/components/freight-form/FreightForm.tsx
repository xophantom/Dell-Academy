import { Alert, Autocomplete, Button, TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import CalculateIcon from "@mui/icons-material/Calculate";
import { FreightForm as FreightFormType } from "../../hooks/useCreateFreightForm";
import { useGetCidades } from "@/api/Cidades/useGetCidades";
import { useGetFreightOptions } from "@/api/Freight/useGetFreightOptions";
import CircularProgress from "@mui/material/CircularProgress";
import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import { FormErrors } from "@/common/components/FormErrors/FormErrors";

type Props = {
  onSubmit(values: FreightFormType): void;
};

export const FreightForm: React.FC<Props> = ({ onSubmit }) => {
  const { options: cidadesOptions = [], isLoading: isCidadesLoading } =
    useGetCidades();

  const { options: freightOptions = [], isLoading: isFreightOptionsLoading } =
    useGetFreightOptions();

  const isLoading = isCidadesLoading || isFreightOptionsLoading;

  const form = useFormContext<FreightFormType>();

  const isOptionEqualToValue = (
    option: typeof freightOptions[0],
    value: typeof freightOptions[0]
  ) => option.id === value.id;

  return (
    <form
      style={{ width: "100%", display: "flex" }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Wrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <FormErrors />
            <Autocomplete
              disablePortal
              fullWidth
              sx={{ borderColor: "red" }}
              id="cidade-de-origem"
              options={cidadesOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cidade de Origem"
                  error={!!form.formState.errors.cidadeA}
                />
              )}
              isOptionEqualToValue={isOptionEqualToValue}
              onChange={(_e, value) => {
                form.setValue("cidadeA", value?.id ?? "");
              }}
            />
            <Autocomplete
              disablePortal
              fullWidth
              id="cidade-de-destino"
              options={cidadesOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cidade de Destino"
                  error={!!form.formState.errors.cidadeB}
                />
              )}
              onChange={(_e, value) => {
                form.setValue("cidadeB", value?.id ?? "");
              }}
              isOptionEqualToValue={isOptionEqualToValue}
            />

            <Autocomplete
              disablePortal
              fullWidth
              id="modalidade-transporte"
              options={freightOptions}
              isOptionEqualToValue={isOptionEqualToValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Modalidade de Transporte"
                  error={!!form.formState.errors.freightType}
                />
              )}
              onChange={(_e, value) => {
                form.setValue("freightType", value?.id ?? "");
              }}
            />
            <Button
              startIcon={<CalculateIcon />}
              variant="contained"
              color="primary"
              type="submit"
            >
              Calcular
            </Button>
          </>
        )}
      </Wrapper>
    </form>
  );
};
