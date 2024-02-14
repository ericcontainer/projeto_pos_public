import UsuarioTable from "../../tables/UsuarioTable";
import Header from "../../global/Header";

const Usuario = () => {
  return (
    <>
      <Header
        title="Usuarios do StackMedia"
        subtitle="Gerenciar grupos dos usuários"
      />
      <UsuarioTable />
    </>
  );
};

export default Usuario;
