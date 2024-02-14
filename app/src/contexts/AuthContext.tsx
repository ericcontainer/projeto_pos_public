import { User } from "firebase/auth";
import { createContext } from "react";
import { UsuarioProps } from "../entidades/iterfaces";

interface AuthContextType {
  userG: User | null | undefined;
  userS: UsuarioProps | null | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);
