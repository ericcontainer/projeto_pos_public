import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  MenuItem,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PostProps, CampanhaProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";
import { useDropzone } from "react-dropzone";

interface CreatePostModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onCreate: (post: PostProps) => void;
  campanhas: Array<CampanhaProps>;
  itemC: PostProps | undefined;
}

const ModalFormPost: React.FC<CreatePostModalProps> = ({
  isOpen,
  title,
  onClose,
  onCreate,
  campanhas,
  itemC,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [campanhaSelected, setCampanhaSelected] = useState<number>();

  const [post, setPost] = useState<PostProps>({
    id: 0,
    nome: "",
    descricao: "",
    texto: "",
    hashtags: "",
    data_publicacao: "",
    status: "ativo",
    id_campanha: 0,
    imagens: [],
    id_agendamento: "",
  });

  useEffect(() => {
    // setPost(() => ({ ...post, campanha: campanhaSelected }));
    if (itemC != undefined) {
      setPost(itemC);
    } else {
      setPost(() => ({ ...post, campanha: campanhaSelected }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemC]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost((prevState) => {
      return {
        ...prevState,
        [name]: value,
        campanha: campanhaSelected,
      };
    });
  };
  // const handleInputChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setPost((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //       imagens: event.target.files || [],
  //     };
  //   });
  // };

  // DROP ZONE
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
    },
    maxFiles: 10,
  });

  const files = acceptedFiles.map((file: File) => (
    <li key={file.lastModified}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const handleCreatePost = (event: FormEvent) => {
    event.preventDefault();
    setPost({ ...post, id_campanha: campanhaSelected });
    const newPost: PostProps = {
      id: post.id,
      nome: post.nome,
      descricao: post.descricao,
      texto: post.texto,
      imagens: acceptedFiles,
      status: post.status,
      data_publicacao: post.data_publicacao,
      id_campanha: post.id_campanha,
      hashtags: post.hashtags,
      id_agendamento: post.id_agendamento,
    };
    onCreate(newPost);
    post;
    setPost({
      nome: "",
      descricao: "",
      texto: "",
      imagens: [],
      data_publicacao: "",
      hashtags: "",
      status: "ativo",
      id_campanha: 0,
      id_agendamento: "",
    });
  };
  return (
    <div>
      <Modal
        id="modal-post"
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "5px",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {title}
          </Typography>
          <Box component="form" onSubmit={handleCreatePost} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome-post"
              label="Nome da post"
              name="nome"
              value={post.nome ? post.nome : itemC?.nome}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="descricao"
              label="Descrição"
              name="descricao"
              value={post.descricao ? post.descricao : itemC?.descricao}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="texto"
              label="Texto do Post"
              name="texto"
              value={post.texto ? post.texto : itemC?.texto}
              onChange={handleInputChange}
            />
            <section className="container">
              <div
                {...getRootProps({ className: "dropzone" })}
                style={{
                  borderStyle: "dotted",
                  borderColor: colors.primary[700],
                  marginTop: 15,
                  marginBottom: 15,
                  backgroundColor: colors.greenAccent[800],
                }}
              >
                <input {...getInputProps()} />
                <p style={{ textAlign: "center", marginTop: "10px" }}>
                  Arraste as imagens que serão utilizadas
                </p>
                <aside>
                  <ul>{files}</ul>
                </aside>
              </div>
            </section>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="hashtags"
              label="Hash Tags"
              name="hashtags"
              value={post.hashtags ? post.hashtags : itemC?.hashtags}
              onChange={handleInputChange}
            /> */}
            {/* <Button
              variant="outlined"
              fullWidth
              component="label"
              sx={{ mt: "17px", p: "9px" }}
            >
              <Camera fontSize="large" />
              FILE UPLOAD
              <input
                type="file"
                accept="image/jpeg"
                hidden
                onChange={(e) => handleInputChangeInput(e)}
              />
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              {post.imagens[0] && post.imagens[0].name}
            </Typography> */}

            {/* <FileUpload /> */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="data_publicacao"
              label="Data publicação"
              name="data_publicacao"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={
                post.data_publicacao
                  ? post.data_publicacao
                  : itemC?.data_publicacao
              }
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              select
              fullWidth
              required
              id="id_campanha"
              label="Campanha"
              name="id_campanha"
              value={
                post.id_campanha != 0
                  ? post.id_campanha || ""
                  : itemC?.id_campanha || ""
              }
              onChange={handleInputChange}
            >
              {campanhas.map((option) => (
                <MenuItem
                  onClick={() => {
                    setCampanhaSelected(option.id);
                    setPost({ ...post, id_campanha: option.id });
                  }}
                  key={option.id}
                  value={option.id}
                >
                  {option.nome}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                p: 2,
                backgroundColor: colors.greenAccent[300],
              }}
            >
              {itemC?.nome ? <>Atualizar Post</> : <>Cadastrar Post</>}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalFormPost;
