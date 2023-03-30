import { useGetFreightObjects } from "@/api/Freight/useGetFreightObjects";
import { Wrapper } from "@/common/components/Wrapper/Wrapper";
import { CidadesObjetosContext } from "@/features/cadastrar-transporte/context/CidadesObjetosContext";
import { ObjetosListForm } from "@/features/cadastrar-transporte/hooks/useCreateObjetosForm";
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
import { getObjectTitle } from "./ObjetosList.model";
import { StyledListItem } from "./ObjetosList.styles";

export const ObjetosList: React.FC = () => {
  const objetosListFieldArray = useFieldArray<
    ObjetosListForm,
    never,
    "value" | "id"
  >({
    // @ts-expect-error looks like there's an error with typing in react hook forms library
    // or there's not enough documentation to use it with TypeScript
    name: "objetos",
  });

  const objetos: ObjetosListForm["objetos"] = useWatch({
    name: "objetos",
  });

  const { objetos: objetosQuery, cidades: cidadesQuery } = useContext(
    CidadesObjetosContext
  );

  return (
    <Wrapper>
      {!!objetos.length && (
        <List
          sx={{
            width: "100%",
            height: "250px",
            overflow: "auto",
          }}
        >
          {objetos.map((objetoValue, index) => (
            <StyledListItem key={objetoValue.value}>
              <ListItemText>
                {/* TODO: Improve this to show object name, weight, quantity and total weight */}
                {/* Just like the consultar-trechos-x-modalidades */}
                {getObjectTitle({
                  objetoValue,
                  objetosData: objetosQuery?.data,
                  cidadesData: cidadesQuery?.data,
                })}
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="delete"
                  onClick={() => objetosListFieldArray.remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </StyledListItem>
          ))}
        </List>
      )}
      {!objetos.length && (
        <Typography variant="body1">
          Por favor, adicione um ou mais objetos
        </Typography>
      )}
    </Wrapper>
  );
};
