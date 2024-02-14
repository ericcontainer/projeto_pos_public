import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { ContaProps, EmpresaProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import {
  getCampanhaService,
  getContaService,
  getEmpresaService,
  setContaService,
  setHistoricoService,
  updateContaService,
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
  Tooltip,
} from "@mui/material";
import ModalFormConta from "../forms/ModalFormConta";
import { AuthContext } from "../../contexts/AuthContext";

const ContaTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [contaData, setContaData] = useState<Array<ContaProps>>([]);
  const [conta, setConta] = useState<ContaProps>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [empresa, setEmpresa] = useState<Array<EmpresaProps>>([]);
  const auth = useContext(AuthContext);
  //   const [dataLoading, setDataloading] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleGetEmpresa = () => {
    getEmpresaService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<EmpresaProps> = [];
              data["data"].map((v: EmpresaProps) => {
                if (v.status === "ativo") finalData.push(v);
              });
              setEmpresa(finalData);
              setLoading(false);
            }
          });
        }
      })
      .catch(() => {
        setMsg("Falha para buscar dados!");
        setMsgType("error");
        setMsgOpen(true);
        setLoading(false);
      });
  };
  const handleData = () => {
    setLoading(true);
    getContaService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<ContaProps> = [];

              data["data"].map((v: ContaProps) => {
                if (v.status === "ativo") finalData.push(v);
              });

              setContaData(finalData);
              setLoading(false);
            }
          });
        }
      })
      .catch(() => {
        setMsg("Falha para buscar dados!");
        setMsgType("error");
        setMsgOpen(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleData();
    handleGetEmpresa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateConta = (conta: ContaProps) => {
    setOpen(true);
    setConta(conta);
    setIsUpdate(true);
  };

  const handleRemoveConta = (itemConta: ContaProps) => {
    getCampanhaService().then((c) => {
      c.json().then((data) => {
        let remove = true;
        for (let index = 0; index < data["data"].length; index++) {
          remove = true;
          const element = data["data"][index];
          if (
            element.id_conta === itemConta.id &&
            element.status !== "inativo"
          ) {
            alert("Conta possui campanha cadastradas!");
            remove = false;
            break;
          }
        }
        if (remove) {
          itemConta.status = "inativo";
          setHistoricoService({
            id: 0,
            usuario:
              auth.userG?.displayName?.toString() ||
              auth.userG?.email?.toString() ||
              "",
            descricao: "Removeu conta: " + JSON.stringify(itemConta),
          });
          setLoading(true);
          updateContaService(itemConta)
            .then((r) => {
              if (r.ok) {
                setMsgOpen(true);
                setMsgType("success");
                setMsg("Conta removida com sucesso!");
                setLoading(false);
              }
            })
            .catch(() => {
              setMsgOpen(true);
              setMsgType("error");
              setMsg("Falha para remover conta!");
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
  const handleCreateConta = (conta: ContaProps) => {
    setLoading(true);
    setOpen(false);
    setHistoricoService({
      id: 0,
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "Criou conta: " + JSON.stringify(conta),
    });
    if (isUpdate) {
      setHistoricoService({
        id: 0,
        usuario:
          auth.userG?.displayName?.toString() ||
          auth.userG?.email?.toString() ||
          "",
        descricao: "Atualizou conta: " + JSON.stringify(conta),
      });
      updateContaService(conta)
        .then((r) => {
          if (r.ok) {
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Conta Atualizada com sucesso!");
          }
        })
        .catch(() => {
          setMsgOpen(true);
          setMsgType("error");
          setMsg("Error para atualizar  conta!");
        });
      setOpen(false);
      setIsUpdate(false);
    } else {
      setContaService(conta)
        .then((r) => {
          if (r.ok) {
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Conta criada com sucesso!");
          }
        })
        .catch(() => {
          setMsgOpen(true);
          setMsgType("error");
          setMsg("Error para criar  conta!");
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
    getContaService().then((r) => {
      r.json().then((data) => {
        let rt = "";
        data.data.map((s: ContaProps) => {
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
              s.tipo +
              ";" +
              s.usuario +
              ";" +
              s.id_empresa +
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
        const fileName = `Contas.csv`;
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
      {contaData.length > 0 ? (
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
            <Box>
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
                  setConta({
                    id: 0,
                    nome: "",
                    descricao: "",
                    tipo: "",
                    usuario: "",
                    senha: "",
                    status: "ativo",
                    id_empresa: 0,
                    campanhas: [],
                    created_at: "",
                    updated_at: "",
                  });
                }}
              >
                <InstagramIcon style={{ marginRight: "5px" }} />
                Instagram
              </Button>
              <Tooltip placement="top" title="Em breve!">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: colors.greenAccent[300],

                    opacity: 0.5,
                    marginBottom: "8px",
                    marginRight: "8px",
                    color: colors.grey[900],
                    padding: 12,
                  }}
                >
                  <FacebookIcon style={{ marginRight: "5px" }} />
                  Facebook
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Em breve!">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: colors.greenAccent[300],
                    opacity: 0.5,
                    marginBottom: "8px",
                    marginRight: "8px",
                    color: colors.grey[900],
                    padding: 12,
                  }}
                >
                  <LinkedInIcon style={{ marginRight: "5px" }} />
                  LinkedIn
                </Button>
              </Tooltip>
            </Box>
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

          <ModalFormConta
            isOpen={isOpen}
            onClose={handleCloseModal}
            onCreate={handleCreateConta}
            empresas={empresa}
            title={"Conta Instagram"}
            itemC={conta}
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
                    <strong>REDE SOCIAL</strong>
                  </TableCell>
                  <TableCell>
                    <strong>USUARIO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>EMPRESA</strong>
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
                {contaData.map((item: ContaProps) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>
                      <InstagramIcon
                        style={{ marginRight: "5px", marginBottom: "4px" }}
                        fontSize="small"
                      />
                      {item.tipo}
                    </TableCell>
                    <TableCell>{item.usuario}</TableCell>
                    <TableCell>{item.id_empresa}</TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>{item.updated_at}</TableCell>
                    <TableCell>
                      {
                        <IconButton
                          onClick={() => {
                            handleUpdateConta(item);
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
                            handleRemoveConta(item);
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
          <ModalFormConta
            isOpen={isOpen}
            onClose={handleCloseModal}
            onCreate={handleCreateConta}
            empresas={empresa}
            title={"Instagram"}
            itemC={conta}
          />
          {/* <Message open={msgOpen} type={msgType} message={msg} /> */}

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
                Cadastrar nova conta
              </Button>
            )}
          </h5>
        </>
      )}
    </>
  );
};
export default ContaTable;
