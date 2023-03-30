import { useGetCidades } from "@/api/Cidades/useGetCidades";
import { useGetFreightObjects } from "@/api/Freight/useGetFreightObjects";
import { createContext, ReactNode } from "react";

type CidadesObjetosContextType = {
  cidades: ReturnType<typeof useGetCidades> | null;
  objetos: ReturnType<typeof useGetFreightObjects> | null;
};

export const CidadesObjetosContext = createContext<CidadesObjetosContextType>({
  cidades: null,
  objetos: null,
});

type Props = {
  contextValue: CidadesObjetosContextType;
  children: ReactNode;
};

export const CidadesObjetosContextProvider: React.FC<Props> = ({
  contextValue,
  children,
}) => {
  return (
    <CidadesObjetosContext.Provider value={contextValue}>
      {children}
    </CidadesObjetosContext.Provider>
  );
};
