import Header from "../../global/Header";
import EmpresaTable from "../../tables/EmpresaTable";

const EmpresaView = () => {
  return (
    <>
      <Header title="Empresas" subtitle="Gerenciar/Cadastrar empresas" />
      <EmpresaTable />
    </>
  );
};
export default EmpresaView;
