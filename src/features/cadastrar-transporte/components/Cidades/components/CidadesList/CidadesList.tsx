import { useGetCidades } from "@/api/Cidades/useGetCidades";
import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import { CidadesObjetosContext } from "@/features/cadastrar-transporte/context/CidadesObjetosContext";
import { CidadesListForm } from "@/features/cadastrar-transporte/hooks/useCreateCidadesForm";
import { getCidade } from "@/features/cadastrar-transporte/utils/getCidade";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  List,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { StyledListItem } from "./CidadesList.styles";

export const CidadesList: React.FC = () => {
  const cidadesListFieldArray = useFieldArray<
    CidadesListForm,
    never,
    "value" | "id"
  >({
    // @ts-expect-error looks like there's an error with typing in react hook forms library
    // or there's not enough documentation to use it with TypeScript
    name: "cidades",
  });

  const cidades: CidadesListForm["cidades"] = useWatch({
    name: "cidades",
  });

  const { cidades: cidadesQuery } = useContext(CidadesObjetosContext);

  return (
    <Wrapper>
      {!!cidades.length && (
        <List
          sx={{
            width: "100%",
            height: "250px",
            overflow: "auto",
          }}
        >
          {cidades.map((cidadeId, index) => (
            <StyledListItem key={cidadeId.value}>
              <ListItemText>
                {getCidade({
                  cidadeId: cidadeId.value,
                  cidadesData: cidadesQuery?.data,
                })}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="delete"
                  onClick={() => cidadesListFieldArray.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </StyledListItem>
          ))}
        </List>
      )}
      {!cidades.length && (
        <Typography variant="body1">
          Por favor, adicione uma ou mais cidades
        </Typography>
      )}
    </Wrapper>
  );
};
