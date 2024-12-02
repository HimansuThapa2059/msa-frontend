import { ReactNode, useCallback, useEffect, useState } from "react";
import { AppContext } from "./context";

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useState(localStorage.getItem("msa-token"));
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    const res = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(data);
  }, [token]);

  useEffect(() => {
    if (token) getUser();
  }, [token, getUser]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
