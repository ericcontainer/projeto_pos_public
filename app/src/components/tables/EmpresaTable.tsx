import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  useTheme,
  Button,
  AlertColor,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { tokens } from "../../theme";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { EmpresaProps } from "../../entidades/iterfaces";
import {
  getContaService,
  getEmpresaService,
  setEmpresaService,
  setHistoricoService,
  updateEmpresaService,
} from "../../services/commonServices";
import ModalAlert from "../global/ModalAlert";
import ModalFormEmpresa from "../forms/ModalFormEmpresa";
import { AuthContext } from "../../contexts/AuthContext";

import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
const EmpresaTable = () => {
  const [empresaData, setEmpresaData] = useState<Array<EmpresaProps>>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modalOpen, setModalOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [empresa, setEmpresa] = useState<EmpresaProps>();
  const [isUpdate, setIsUpdate] = useState(false);
  const auth = useContext(AuthContext);

  const handleData = () => {
    setLoading(true);

    getEmpresaService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<EmpresaProps> = [];

              data["data"].map((v: EmpresaProps) => {
                if (v.status === "ativo") finalData.push(v);
              });

              setEmpresaData(finalData);
              setLoading(false);
            }
          });
        }
      })
      .catch((e) => {
        setMsg("Falha para buscar dados!" + e);
        setMsgType("error");
        setMsgOpen(true);
        setLoading(false);
      });
  };
  const handleCloseMessage = () => {
    setMsgOpen(false);
  };
  useEffect(handleData, []);

  const handleModalOpen = () => {
    // TODO
    // Clear Modal After Close
    // document.querySelectorAll("input").forEach((i) => (i.value = ""));

    setModalOpen(true);
    setEmpresa({
      cnpj: "",
      descricao: "",
      status: "ativo",
      nome: "",
      contas: [],
      created_at: "",
      updated_at: "",
    });
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleCreateCompany = (empresa: EmpresaProps | EmpresaProps) => {
    setModalOpen(true);
    setLoading(true);
    setHistoricoService({
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "Criou empresa: " + JSON.stringify(empresa),
    });

    if (isUpdate) {
      setHistoricoService({
        id: 0,
        usuario:
          auth.userG?.displayName?.toString() ||
          auth.userG?.email?.toString() ||
          "",
        descricao: "Atualizou empresa: " + JSON.stringify(empresa),
      });
      updateEmpresaService(empresa)
        .then((r) => {
          if (r.ok) {
            setLoading(false);
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Empresa atualizada com Sucesso!");
          }
        })
        .catch(() => {
          setLoading(false);
          setMsgOpen(true);
          setMsgType("error");
          setMsg("Error para atualizar empresa!");
        });
      setModalOpen(false);
      setIsUpdate(false);
    } else {
      setEmpresaService(empresa)
        .then((r) => {
          if (r.ok) {
            setLoading(false);
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Empresa criada com sucesso!");
          }
        })
        .catch((e) => {
          setLoading(false);
          setMsgOpen(true);
          console.debug("Error para criar empresa ", e);
          setMsgType("error");
          setMsg("Error para criar empresa!");
        });
      setModalOpen(false);
    }
    setTimeout(() => {
      setMsgOpen(false);
      handleData();
    }, 2000);
  };

  async function createCsv() {
    getEmpresaService().then((r) => {
      r.json().then((data) => {
        let rt = "";
        data.data.map((s: EmpresaProps) => {
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
              s.cnpj +
              ";" +
              s.contas +
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
        const fileName = `Empresas.csv`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    });
  }
  const handleUpdateCompany = (updatempresa: EmpresaProps) => {
    setModalOpen(true);
    setEmpresa(updatempresa);
    setIsUpdate(true);
  };

  const handleRemoveCompany = (updatempresa: EmpresaProps) => {
    getContaService().then((c) => {
      c.json().then((data) => {
        let remove = true;
        for (let index = 0; index < data["data"].length; index++) {
          remove = true;
          const element = data["data"][index];
          if (
            element.id_empresa === updatempresa.id &&
            element.status !== "inativo"
          ) {
            alert("Empresa possui contas cadastradas!");
            remove = false;
            break;
          }
        }
        if (remove) {
          updatempresa.status = "inativo";
          setLoading(true);
          setHistoricoService({
            id: 0,
            usuario:
              auth.userG?.displayName?.toString() ||
              auth.userG?.email?.toString() ||
              "",
            descricao: "Removeu empresa: " + JSON.stringify(updatempresa),
          });
          updateEmpresaService(updatempresa)
            .then((r) => {
              if (r.ok) {
                setMsgOpen(true);
                setMsgType("success");
                setMsg("Empresa removida com sucesso!");
                setLoading(false);
              }
            })
            .catch((e) => {
              console.log("Erro para remover empresa! ", e);
              setMsgOpen(true);
              setMsgType("error");
              setMsg("Falha para remover empresa!");
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
      {empresaData.length > 0 ? (
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
                color: colors.grey[900],
                padding: 12,
              }}
              onClick={handleModalOpen}
            >
              Cadastrar Nova Empresa
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
          <ModalFormEmpresa
            isOpen={modalOpen}
            onClose={handleModalClose}
            onCreate={handleCreateCompany}
            update={empresa}
            title="Gerenciar Empresa"
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
                    <strong>CNPJ</strong>
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
                {empresaData.map((item: EmpresaProps) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{item.cnpj}</TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>{item.updated_at}</TableCell>
                    <TableCell>
                      {
                        <IconButton
                          onClick={() => {
                            handleUpdateCompany(item);
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
                            handleRemoveCompany(item);
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
          <ModalFormEmpresa
            isOpen={modalOpen}
            onClose={handleModalClose}
            onCreate={handleCreateCompany}
            update={empresa}
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
                onClick={handleModalOpen}
              >
                Criar nova Empresa
              </Button>
            )}
          </h5>
        </>
      )}
    </>
  );
};
export default EmpresaTable;
