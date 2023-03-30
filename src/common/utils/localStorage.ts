import { useCalculateTransporte } from "@/features/cadastrar-transporte/hooks/useCalculateTransporte";

enum LocalStorageKeys {
  transportes = "transportes",
}

type Transporte = {
  content: NonNullable<ReturnType<typeof useCalculateTransporte>["data"]>;
  timestamp: string;
};

export const LocalStorageManager = {
  getTransportes: (): Transporte[] | null => {
    return JSON.parse(
      localStorage.getItem(LocalStorageKeys.transportes) ?? "null"
    );
  },
  saveTransportes: (data: Transporte[]) => {
    return localStorage.setItem(
      LocalStorageKeys.transportes,
      JSON.stringify(data)
    );
  },
  pushTransportes: (data: Transporte) => {
    let actualState = LocalStorageManager.getTransportes();
    if (Array.isArray(actualState)) {
      actualState = [...actualState, data];
      LocalStorageManager.saveTransportes(actualState);
    } else {
      LocalStorageManager.saveTransportes([data]);
    }
  },
};
