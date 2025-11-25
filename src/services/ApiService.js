import { useMemo } from "react";
import useFetch from "../hooks/useFetch.js";

const BASE = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1";

export function useMealsService() {
  const config = useMemo(
    () => ({
      url: `${BASE}/meals`,
      options: { method: "GET" },
    }),
    []
  );

  return useFetch(config);
}
