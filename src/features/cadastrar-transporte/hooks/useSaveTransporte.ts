import { LocalStorageManager } from "@/common/utils/localStorage";
import { useEffect } from "react";
import { useCalculateTransporte } from "./useCalculateTransporte";

export const useSaveTransporte = (
  data: ReturnType<typeof useCalculateTransporte>["data"]
) => {
  useEffect(() => {
    if (data) {
      const storeDataFormat = {
        content: data,
        timestamp: new Date().toISOString(),
      };

      LocalStorageManager.pushTransportes(storeDataFormat);
    }
  }, [data]);
};
