import { useContext } from "react";
import LoginStack from "../components/global/LoginStack";
import { AuthContext } from "./AuthContext";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (!auth.userG) {
    return (
      <>
        <LoginStack />
      </>
    );
  }
  return children;
};
export default RequireAuth;
