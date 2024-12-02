import { createContext } from "react";

interface ContextTypes {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>> | null;
  user: {
    id: number;
    name: string;
    email: string;
    email_varified_at: string | null;
    created_at: string;
    updated_at: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<null>> | null;
}

export const AppContext = createContext<ContextTypes>({
  token: null,
  setToken: null,
  user: null,
  setUser: null,
});
