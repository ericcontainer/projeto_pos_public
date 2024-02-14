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
import { UsuarioProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";

interface CreateUsuarioModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onCreate: (conta: UsuarioProps) => void;
  itemC: UsuarioProps | undefined;
}

const ModalFormUsuario: React.FC<CreateUsuarioModalProps> = ({
  isOpen,
  title,
  onClose,
  onCreate,
  itemC,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [usuario, setUsuario] = useState<UsuarioProps>({
    id: "",
    nome: "",
    descricao: "",
    email: "",
    grupo: "",
    foto: "",
    status: "ativo",
  });

  useEffect(() => {
    // setUsuario(() => ({ ...conta, usuario: usuarioSelected }));
    if (itemC != undefined) {
      setUsuario(itemC);
    } else {
      setUsuario(() => ({ ...usuario, usuario: usuario }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemC]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUsuario((prevState) => {
      return {
        ...prevState,
        [name]: value,
        usuario: usuario,
      };
    });
  };

  const handleCreateUsuario = (event: FormEvent) => {
    event.preventDefault();
    setUsuario({ ...usuario });
    const newUsuario: UsuarioProps = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      descricao: usuario.descricao,
      grupo: usuario.grupo,
      status: usuario.status,
      foto: usuario.foto,
    };
    onCreate(newUsuario);
    usuario;
    setUsuario({
      nome: "",
      descricao: "",
      grupo: "",
      email: "",
      foto: "",
      status: "ativo",
    });
  };
  return (
    <div>
      <Modal
        id="modal-usuario"
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
          <Box component="form" onSubmit={handleCreateUsuario} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              disabled
              id="nome-usuario"
              label="Nome do usuario"
              name="nome"
              value={usuario.nome ? usuario.nome : itemC?.nome}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              disabled
              id="descricao"
              label="Descrição"
              name="descricao"
              value={usuario.descricao ? usuario.descricao : itemC?.descricao}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              disabled
              name="email"
              value={usuario.email ? usuario.email : itemC?.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              select
              fullWidth
              id="grupo"
              label="Grupo"
              name="grupo"
              value={usuario.grupo ? usuario.grupo : itemC?.grupo}
              onChange={handleInputChange}
            >
              <MenuItem key={"user"} value={"user"}>
                {"user"}
              </MenuItem>
              <MenuItem key={"admin"} value={"admin"}>
                {"admin"}
              </MenuItem>
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
              <>Atualizar Grupo</>
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalFormUsuario;
