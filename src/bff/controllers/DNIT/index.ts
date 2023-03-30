import { getCidadesDistancias, getDistancia } from "@/bff/models/DNIT";

export const Cidades = {
  GET: () => {
    const { cidades } = getCidadesDistancias();

    return { cidades };
  },
};

export const Distancias = {
  GET: () => {
    const { distancias } = getCidadesDistancias();

    return { distancias };
  },
};

export const CidadesDistancias = {
  GET: () => {
    return getCidadesDistancias();
  },
};

export const Distancia = {
  GET: ({ cidadeA, cidadeB }: { cidadeA: number; cidadeB: number }) => {
    return getDistancia({ cidadeA, cidadeB });
  },
};
