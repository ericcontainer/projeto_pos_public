import { Route, Routes } from "react-router-dom";
import SideBarCustom from "../global/SidebarCustom";
import TopbarCustom from "../global/TopbarCustom";
import Agendamento from "./gerenciar/agendamento";
import Ajuda from "./stackmedia/ajuda";
import Campanha from "./gerenciar/campanha";
import Dashboard from "./dashboard/dashboard";
import EmpresaView from "./gerenciar/empresaView";
import Historico from "./stackmedia/historico";
import Settings from "./stackmedia/settings";
import Contas from "./gerenciar/contas";
import Error404 from "./404";
import Posts from "./gerenciar/posts";
import Usuario from "./gerenciar/usuario";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const GlobalContent = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="app">
      <SideBarCustom />
      <main className="content">
        <TopbarCustom />
        <Routes>
          {auth.userS?.grupo == "admin" ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="/agendamentos" element={<Agendamento />} />
              <Route path="/campanhas" element={<Campanha />} />
              <Route path="/historico" element={<Historico />} />
              <Route path="/empresas" element={<EmpresaView />} />
              <Route path="/configuracoes" element={<Settings />} />
              <Route path="/contas" element={<Contas />} />
              <Route path="/usuarios" element={<Usuario />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="*" element={<Error404 />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ajuda" element={<Ajuda />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

export default GlobalContent;
