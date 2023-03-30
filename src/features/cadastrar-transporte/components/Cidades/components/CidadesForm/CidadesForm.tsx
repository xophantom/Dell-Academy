import { FormErrors } from "@/common/components/FormErrors/FormErrors";
import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import { CidadesObjetosContext } from "@/features/cadastrar-transporte/context/CidadesObjetosContext";
import { CidadeForm } from "@/features/cadastrar-transporte/hooks/useCreateCidadesForm";
import { AutocompleteOption } from "@/common/utils/types";
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  onSubmit: (values: CidadeForm) => void;
};

export const CidadesForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useFormContext<CidadeForm>();

  const { cidades } = useContext(CidadesObjetosContext);

  const isOptionEqualToValue = (
    option: AutocompleteOption,
    value: AutocompleteOption
  ) => option.id === value.id;

  return (
    <form
      style={{ width: "100%", display: "flex" }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Wrapper>
        <FormErrors />
        <Autocomplete
          disablePortal
          fullWidth
          sx={{ borderColor: "red" }}
          id="cidade"
          options={cidades?.options ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cidade"
              error={!!form.formState.errors.cidadeToAdd}
            />
          )}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(_e, value) => {
            form.setValue("cidadeToAdd", value?.id ?? "");
          }}
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          type="submit"
        >
          Adicionar
        </Button>
      </Wrapper>
    </form>
  );
};
