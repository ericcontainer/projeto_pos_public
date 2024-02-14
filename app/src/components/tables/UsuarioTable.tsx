import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  useTheme,
  AlertColor,
  CircularProgress,
  Backdrop,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { tokens } from "../../theme";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { UsuarioProps } from "../../entidades/iterfaces";
import {
  getUsuarioService,
  setHistoricoService,
  updateUsuarioService,
} from "../../services/commonServices";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import ModalAlert from "../global/ModalAlert";
import ModalFormUsuario from "../forms/ModalFormUsuario";
import { AuthContext } from "../../contexts/AuthContext";

const UsuarioTable = () => {
  const [usuarioData, setUsuarioData] = useState<Array<UsuarioProps>>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setOpen] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioProps>();
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleUpdateUsuario = (usuario: UsuarioProps) => {
    setOpen(true);
    setUsuario(usuario);
  };
  const handleData = () => {
    setLoading(true);

    getUsuarioService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<UsuarioProps> = [];
              if (Array.isArray(data["data"])) {
                data["data"].map((v: UsuarioProps) => {
                  finalData.push(v);
                });
              } else {
                finalData.push(data["data"]);
              }
              setUsuarioData(finalData);

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
  useEffect(handleData, []);
  const handleCloseMessage = () => {
    setMsgOpen(false);
  };

  const handleCreateUsuario = (usuario: UsuarioProps) => {
    setHistoricoService({
      id: 0,
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "Atualizou usuario: " + JSON.stringify(usuario),
    });
    updateUsuarioService(usuario)
      .then((r) => {
        if (r.ok) {
          setLoading(false);
          setMsgOpen(true);
          setMsgType("success");
          setMsg("Usuario atualizada com Sucesso!");
        }
      })
      .catch(() => {
        setLoading(false);
        setMsgOpen(true);
        setMsgType("error");
        setMsg("Error para atualizar usuario!");
      });
    setOpen(false);
    setTimeout(() => {
      setMsgOpen(false);
      handleData();
    }, 2000);
  };
  async function createCsv() {
    getUsuarioService().then((r) => {
      r.json().then((data) => {
        let rt = "";
        data.data.map((s: UsuarioProps) => {
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
              s.created_at +
              ";" +
              s.updated_at +
              "\n";
          }
        });
        const url = window.URL.createObjectURL(new Blob([rt]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = `Usuarios.csv`;
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

      <Box
        sx={{
          p: "20px",
        }}
      >
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: colors.grey[700] }}>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>USUARIO</strong>
                </TableCell>
                <TableCell>
                  <strong>DESCRIÇÃO</strong>
                </TableCell>
                <TableCell>
                  <strong>FOTO</strong>
                </TableCell>
                <TableCell>
                  <strong>E-MAIL</strong>
                </TableCell>
                <TableCell>
                  <strong>GRUPO</strong>
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
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.primary[400] }}>
              {usuarioData.map((item: UsuarioProps) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>
                    {item.foto == "" ? (
                      <FaceOutlinedIcon fontSize="large" />
                    ) : (
                      <img
                        style={{
                          borderRadius: "50px",
                        }}
                        width={"50px"}
                        height={"50px"}
                        src={item.foto}
                      />
                    )}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.grupo}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.updated_at}</TableCell>
                  <TableCell>
                    {
                      <IconButton
                        onClick={() => {
                          handleUpdateUsuario(item);
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon />
                      </IconButton>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ModalFormUsuario
        isOpen={isOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateUsuario}
        title={"Editar Grupo Usuario"}
        itemC={usuario}
      />
    </>
  );
};
export default UsuarioTable;
