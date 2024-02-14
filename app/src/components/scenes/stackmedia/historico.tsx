import HistoricoTable from "../../tables/HitoricoTable";
import Header from "../../global/Header";

const Historico = () => {
  return (
    <>
      <Header title="Auditoria/Histórico" subtitle="Histórico de ações" />

      <HistoricoTable />
    </>
  );
};
export default Historico;
