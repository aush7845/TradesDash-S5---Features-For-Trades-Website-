import { useCallback, useEffect, useState } from "react";
import { api } from "./api.js";

// const { data, loading, error, reload } = useApi("/features");
export function useApi(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const load = useCallback(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    api(path)
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ data: null, loading: false, error }));
    return () => {
      cancelled = true;
    };
  }, [path]);

  useEffect(() => load(), [load]);
  return { ...state, reload: load };
}
