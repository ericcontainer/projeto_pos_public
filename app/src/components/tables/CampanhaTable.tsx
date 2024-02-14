import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { CampanhaProps, ContaProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import {
  getCampanhaService,
  getContaService,
  getPostService,
  setCampanhaService,
  setHistoricoService,
  updateCampanhaService,
} from "../../services/commonServices";
import Box from "@mui/material/Box";
import ModalAlert from "../global/ModalAlert";
import {
  AlertColor,
  Backdrop,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModalFormCampanha from "../forms/ModalFormCampanha";
import { AuthContext } from "../../contexts/AuthContext";
// import ModalFormCampanha from "../forms/ModalFormCampanha";

const CampanhaTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [CampanhaData, setCampanhaData] = useState<Array<CampanhaProps>>([]);
  const [campanha, setCampanha] = useState<CampanhaProps>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [conta, setConta] = useState<Array<ContaProps>>([]);

  const auth = useContext(AuthContext);
  //   const [dataLoading, setDataloading] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleGetCampanha = () => {
    getContaService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<ContaProps> = [];
              data["data"].map((v: ContaProps) => {
                if (v.status === "ativo") finalData.push(v);
              });
              setConta(finalData);
              setLoading(false);
            }
          });
        }
      })
      .catch((e) => {
        setMsg("Falha para buscar dados!");
        setMsgType("error");
        setMsgOpen(true);
        console.log("Error para buscar dados" + e);
        setLoading(false);
      });
  };
  const handleData = () => {
    setLoading(true);
    getCampanhaService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<CampanhaProps> = [];
              data["data"].map((v: CampanhaProps) => {
                if (v.status === "ativo") {
                  finalData.push(v);
                }
              });
              setCampanhaData(finalData);
              setLoading(false);
            }
          });
        }
      })
      .catch((e) => {
        setMsg("Falha para buscar dados!");
        setMsgType("error");
        setMsgOpen(true);
        console.log("Error para buscar dados" + e);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleData();
    handleGetCampanha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateCampanha = (Campanha: CampanhaProps) => {
    setOpen(true);
    setCampanha(Campanha);
    setIsUpdate(true);
  };

  const handleRemoveCampanha = (itemCampanha: CampanhaProps) => {
    getPostService().then((c) => {
      c.json().then((data) => {
        let remove = true;
        for (let index = 0; index < data["data"].length; index++) {
          remove = true;
          const element = data["data"][index];
          if (
            element.id_campanha === itemCampanha.id &&
            element.status !== "inativo"
          ) {
            alert("Campanha possui Post ativos cadastrados!");
            remove = false;
            break;
          }
        }
        if (remove) {
          itemCampanha.status = "inativo";
          setLoading(true);
          setHistoricoService({
            id: 0,
            usuario:
              auth.userG?.displayName?.toString() ||
              auth.userG?.email?.toString() ||
              "",
            descricao: "Removeu campanha: " + JSON.stringify(itemCampanha),
          });
          updateCampanhaService(itemCampanha)
            .then((r) => {
              if (r.ok) {
                setMsgOpen(true);
                setMsgType("success");
                setMsg("Campanha removida com sucesso!");
                setLoading(false);
              }
            })
            .catch((e) => {
              console.log("Erro para remover Campanha! ", e);
              setMsgOpen(true);
              setMsgType("error");
              setMsg("Falha para remover Campanha!");
              setLoading(false);
            });
          setTimeout(() => {
            setMsgOpen(false);
            handleData();
          }, 2000);
        }
      });
    });
  };
  const handleCreateCampanha = (Campanha: CampanhaProps) => {
    setLoading(true);
    setOpen(false);
    setHistoricoService({
      id: 0,
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "Criou campanha: " + JSON.stringify(Campanha),
    });
    if (isUpdate) {
      setHistoricoService({
        id: 0,
        usuario:
          auth.userG?.displayName?.toString() ||
          auth.userG?.email?.toString() ||
          "",
        descricao: "Atualizou campanha: " + JSON.stringify(Campanha),
      });
      updateCampanhaService(Campanha)
        .then((r) => {
          if (r.ok) {
            console.log("Campanha Atualizada com sucesso!");
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Campanha Atualizada com sucesso!");
          }
        })
        .catch((e) => {
          console.log("Error para atualizar Campanha ", e);
          setMsgOpen(true);
          setMsgType("error");
          setMsg("Error para atualizar  Campanha!");
        });
      setOpen(false);
      setIsUpdate(false);
    } else {
      setCampanhaService(Campanha)
        .then((r) => {
          if (r.ok) {
            console.log("Campanha criada com sucesso!");
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Campanha criada com sucesso!");
          }
        })
        .catch((e) => {
          console.log("Error para criar  Campanha ", e);
          setMsgOpen(true);
          setMsgType("error");
          setMsg("Error para criar  Campanha!");
        });
      setOpen(false);
      setIsUpdate(false);
    }
    setTimeout(() => {
      setMsgOpen(false);
      setLoading(false);
      handleData();
    }, 2000);
  };
  const handleCloseMessage = () => {
    setMsgOpen(false);
  };

  async function createCsv() {
    getCampanhaService().then((r) => {
      r.json().then((data) => {
        let rt = "";
        data.data.map((s: CampanhaProps) => {
          if (s.status == "ativo") {
            rt =
              rt +
              " " +
              s.id +
              ";" +
              s.nome +
              ";" +
              s.descricao +
              ";" +
              s.data_inicio +
              ";" +
              s.data_fim +
              ";" +
              s.id_conta +
              ";" +
              s.created_at +
              ";" +
              s.updated_at +
              "\n";
          }
        });
        const url = window.URL.createObjectURL(new Blob([rt]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = `Campanhas.csv`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    });
  }
  return (
    <>
      <ModalAlert
        isOpen={msgOpen}
        typeAlert={msgType}
        msg={msg}
        onClose={handleCloseMessage}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {CampanhaData.length > 0 ? (
        <Box
          sx={{
            p: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.greenAccent[300],
                marginBottom: "8px",
                marginRight: "8px",
                color: colors.grey[900],
                padding: 12,
              }}
              onClick={() => {
                setOpen(true);
                setCampanha({
                  id: 0,
                  nome: "",
                  descricao: "",
                  data_fim: "",
                  data_inicio: "",
                  status: "ativo",
                  id_conta: 0,
                  posts: [],
                  created_at: "",
                  updated_at: "",
                });
              }}
            >
              Nova Campanha
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                createCsv();
              }}
              style={{
                backgroundColor: colors.greenAccent[800],
                marginBottom: "8px",
                marginRight: "8px",
                color: colors.primary[100],
                padding: 12,
              }}
            >
              <CloudDownloadOutlinedIcon />
              <span style={{ marginLeft: "10px" }}>Download CSV</span>
            </Button>
          </Box>
          <ModalFormCampanha
            isOpen={isOpen}
            onClose={handleCloseModal}
            onCreate={handleCreateCampanha}
            title="Campanha"
            contas={conta}
            itemC={campanha}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.grey[700] }}>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>NOME</strong>
                  </TableCell>
                  <TableCell>
                    <strong>DESCRIÇÃO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>DATA INÍCIO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>DATA FIM</strong>
                  </TableCell>
                  <TableCell>
                    <strong>ID CONTA</strong>
                  </TableCell>
                  <TableCell>
                    <strong>CRIADO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>ATUALIZADO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>EDITAR</strong>
                  </TableCell>
                  <TableCell>
                    <strong>REMOVER</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: colors.primary[400] }}>
                {CampanhaData.map((item: CampanhaProps) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{item.data_inicio}</TableCell>
                    <TableCell>{item.data_fim}</TableCell>
                    <TableCell>{item.id_conta}</TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>{item.updated_at}</TableCell>
                    <TableCell>
                      {
                        <IconButton
                          onClick={() => {
                            handleUpdateCampanha(item);
                          }}
                        >
                          <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <IconButton
                          onClick={() => {
                            handleRemoveCampanha(item);
                          }}
                        >
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          <ModalFormCampanha
            isOpen={isOpen}
            onClose={handleCloseModal}
            onCreate={handleCreateCampanha}
            title="Campanha"
            contas={conta}
            itemC={campanha}
          />

          <h5 style={{ textAlign: "center", marginTop: "20%" }}>
            {!loading && (
              <Button
                style={{
                  backgroundColor: colors.grey[700],
                  marginBottom: "8px",
                  color: colors.grey[900],
                  padding: 12,
                }}
                onClick={() => setOpen(true)}
              >
                Cadastrar nova Campanha
              </Button>
            )}
          </h5>
        </>
      )}
    </>
  );
};
export default CampanhaTable;
