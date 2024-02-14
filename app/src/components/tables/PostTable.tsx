import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { PostProps, CampanhaProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import {
  getPostService,
  getCampanhaService,
  setPostService,
  updatePostService,
  createSchedule,
  getContaByIDService,
  getCampanhaByIDService,
  setHistoricoService,
  removeScheduleService,
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
import ModalFormPost from "../forms/ModalFormPost";
import { AuthContext } from "../../contexts/AuthContext";

const PostTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isOpen, setOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<Array<PostProps>>([]);
  const [conta, setPost] = useState<PostProps>();
  const [isUpdate, setIsUpdate] = useState(false);
  const [campanha, setCampanha] = useState<Array<CampanhaProps>>([]);

  const auth = useContext(AuthContext);
  //   const [dataLoading, setDataloading] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleGetPost = () => {
    getCampanhaService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<CampanhaProps> = [];
              data["data"].map((v: CampanhaProps) => {
                if (v.status === "ativo") finalData.push(v);
              });

              setCampanha(finalData);
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
    getPostService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<PostProps> = [];

              data["data"].map((v: PostProps) => {
                if (v.status === "ativo") finalData.push(v);
              });

              setPostData(finalData);
              console.log(finalData);
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
    handleGetPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleUpdatePost = (conta: PostProps) => {
  //   setHistoricoService({
  //     id: 0,
  //     usuario: auth.user?.displayName || "principal",
  //     descricao: "Atualizou post: " + JSON.stringify(conta),
  //   });
  //   setOpen(true);
  //   setPost(conta);
  //   setIsUpdate(true);
  // };

  const handleRemovePost = (itemPost: PostProps) => {
    itemPost.status = "inativo";
    setHistoricoService({
      id: 0,
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "removeu post: " + JSON.stringify(itemPost),
    });
    setLoading(true);
    updatePostService(itemPost)
      .then((r) => {
        if (r.ok) {
          setMsgOpen(true);
          setMsgType("success");
          setMsg("Post removida com sucesso!");
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
  };
  const handleCreatePost = (conta: PostProps) => {
    setLoading(true);
    setOpen(false);
    setHistoricoService({
      id: 0,
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "criou um post - " + JSON.stringify(conta),
    });
    if (isUpdate) {
      removeScheduleService(conta.id || 0);
      updatePostService(conta)
        .then((r) => {
          if (r.ok) {
            setMsgOpen(true);
            setMsgType("success");
            setMsg("Post Atualizada com sucesso!");
          }
        })
        .catch(() => {
          setMsgOpen(true);
          setMsgType("error");
          setMsg("Error para atualizar  post!");
        });
      setOpen(false);
      setIsUpdate(false);
    } else {
      setOpen(false);
      setIsUpdate(false);
      if (conta.id_campanha) {
        getCampanhaByIDService(conta.id_campanha?.toString()).then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              getContaByIDService(data["data"].id_conta).then((v) => {
                if (v.ok) {
                  v.json().then((d) => {
                    createSchedule(
                      conta.imagens,
                      conta,
                      d["data"].usuario,
                      d["data"].senha
                    )
                      .then((r) => {
                        r.json().then((j) => {
                          setPostService({
                            ...conta,
                            id_agendamento: j.message,
                          })
                            .then((r) => {
                              if (r.ok) {
                                setMsgOpen(true);
                                setMsgType("success");
                                setMsg("Post criada com sucesso!");
                              }
                            })
                            .catch(() => {
                              setMsgOpen(true);
                              setMsgType("error");
                              setMsg("Error para criar  post!");
                            });
                          setTimeout(() => {
                            setMsgOpen(false);
                            handleData();
                          }, 2000);
                          // console.log("Agendamento Realizado com Sucesso!" + r);
                        });
                      })
                      .catch((e) => {
                        console.log("Error: " + e);
                      });
                  });
                }
              });
            });
          }
        });
      }
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
    getPostService().then((r) => {
      r.json().then((data) => {
        let rt = "";
        data.data.map((s: PostProps) => {
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
              s.id_campanha +
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
        const fileName = `Posts.csv`;
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
      {postData.length > 0 ? (
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
                  setPost({
                    id: 0,
                    nome: "",
                    descricao: "",
                    texto: "",
                    imagens: [],
                    hashtags: "",
                    data_publicacao: "",
                    status: "ativo",
                    id_campanha: 0,
                    created_at: "",
                    updated_at: "",
                    id_agendamento: "",
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
          <ModalFormPost
            isOpen={isOpen}
            onClose={handleCloseModal}
            onCreate={handleCreatePost}
            campanhas={campanha}
            title={"Post Instagram"}
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
                    <strong>TEXTO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>STATUS</strong>
                  </TableCell>
                  <TableCell>
                    <strong>DATA PUBLICACÃO</strong>
                  </TableCell>
                  <TableCell>
                    <strong>CRIADO</strong>
                  </TableCell>
                  {/* <TableCell>
                    <strong>ATUALIZADO</strong>
                  </TableCell> */}
                  {/* <TableCell>
                    <strong>EDITAR</strong>
                  </TableCell> */}
                  <TableCell>
                    <strong>REMOVER</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: colors.primary[400] }}>
                {postData.map((item: PostProps) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{item.texto}</TableCell>
                    <TableCell>
                      {new Date(item.data_publicacao) < new Date()
                        ? "EXECUTADO"
                        : "ATIVO"}
                    </TableCell>
                    <TableCell>{item.data_publicacao}</TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    {/* <TableCell>{item.updated_at}</TableCell> */}

                    {/* <TableCell>
                      {
                        <IconButton
                          onClick={() => {
                            handleUpdatePost(item);
                          }}
                        >
                          <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                      }
                    </TableCell> */}
                    <TableCell>
                      {
                        <IconButton
                          onClick={() => {
                            handleRemovePost(item);
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
          <ModalFormPost
            isOpen={isOpen}
            onClose={handleCloseModal}
            onCreate={handleCreatePost}
            campanhas={campanha}
            title={"Post Instagram"}
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
                Novo Post
              </Button>
            )}
          </h5>
        </>
      )}
    </>
  );
};
export default PostTable;
