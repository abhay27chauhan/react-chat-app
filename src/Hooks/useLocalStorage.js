import { useEffect, useState } from "react";

function useLocalStorge(key, defaultValue = []) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorge;