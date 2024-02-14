import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { AuthContext } from "./AuthContext";
import { UsuarioProps } from "../entidades/iterfaces";
import { getUsuarioService } from "../services/commonServices";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const auth = getAuth(app);
  interface props {
    userG: User | null;
    userS: UsuarioProps;
  }
  const [user, setUser] = useState<props>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAccount) => {
      getUsuarioService(userAccount?.email || "").then((c) => {
        c.json().then((data) => {
          setUser({ userG: userAccount, userS: data["data"] });
        });
      });
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ userG: user?.userG, userS: user?.userS }}>
      {children}
    </AuthContext.Provider>
  );
};
