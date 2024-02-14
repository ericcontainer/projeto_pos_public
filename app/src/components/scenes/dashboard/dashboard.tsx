import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import PieDash from "../../dash/PieDash";
import CardDash from "../../dash/CardDash";
import Box from "@mui/material/Box";
import Header from "../../global/Header";
import { useEffect, useState } from "react";
import {
  getCampanhaService,
  getContaService,
  getEmpresaService,
  getPostService,
  getUsuarioService,
} from "../../../services/commonServices";
import {
  CampanhaProps,
  ContaProps,
  EmpresaProps,
  PostProps,
} from "../../../entidades/iterfaces";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [nuser, setNuser] = useState(0);
  const [ncompany, setCompnay] = useState(0);
  const [npost, setPost] = useState(0);
  const [ncampanha, setCampanha] = useState(0);
  const [nconta, setConta] = useState(0);

  useEffect(() => {
    getEmpresaService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<EmpresaProps> = [];
        j["data"].map((s: EmpresaProps) => {
          if (s.status == "ativo") {
            finalData.push(s);
          }
        });
        setCompnay(finalData.length);
      });
    });
    getPostService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<PostProps> = [];
        j["data"].map((v: PostProps) => {
          if (v.status === "ativo") finalData.push(v);
        });
        setPost(finalData.length);
      });
    });
    getContaService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<ContaProps> = [];
        j["data"].map((s: ContaProps) => {
          if (s.status == "ativo") {
            finalData.push(s);
          }
        });
        setConta(finalData.length);
      });
    });
    getUsuarioService().then((r) => {
      r.json().then((j) => {
        setNuser(j["data"].length);
      });
    });
    getCampanhaService().then((r) => {
      r.json().then((j) => {
        const finalData: Array<CampanhaProps> = [];
        j["data"].map((s: CampanhaProps) => {
          if (s.status == "ativo") {
            finalData.push(s);
          }
        });
        setCampanha(finalData.length);
      });
    });
  }, []);

  return (
    <Box
      sx={{
        p: "20px",
      }}
    >
      <Header title="Dashboard" subtitle="Informações uteis" />
      <Box sx={{ display: "flex" }}>
        <CardDash title="USUÁRIOS" value={nuser.toString()} />
        <CardDash title="TOTAL DE EMPRESAS" value={ncompany.toString()} />
        <CardDash title="TOTAL DE POST" value={npost.toString()} />
        <CardDash title="CAMPANHAS ATIVAS" value={ncampanha.toString()} />
        <CardDash title="TOTAL DE CONTAS" value={nconta.toString()} />
      </Box>

      <Card
        sx={{
          height: "300px",
          width: "400px",
          backgroundColor: colors.primary[400],
        }}
      >
        <PieDash />
      </Card>
    </Box>
  );
};
export default Dashboard;
