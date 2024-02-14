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
import { CampanhaProps, ContaProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";

interface CreateCampanhaModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onCreate: (Campanha: CampanhaProps) => void;
  contas: Array<ContaProps>;
  itemC: CampanhaProps | undefined;
}

const ModalFormCampanha: React.FC<CreateCampanhaModalProps> = ({
  isOpen,
  title,
  onClose,
  onCreate,
  contas,
  itemC,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contaSelected, setContaSelected] = useState<number>();

  const [campanha, setCampanha] = useState<CampanhaProps>({
    id: 0,
    nome: "",
    descricao: "",
    data_inicio: "",
    data_fim: "",
    status: "ativo",
    id_conta: 0,
    posts: [],
  });

  useEffect(() => {
    // setCampanha(() => ({ ...conta, conta: contaSelected }));
    if (itemC != undefined) {
      setCampanha(itemC);
    } else {
      setCampanha(() => ({ ...campanha, id_conta: contaSelected }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemC]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCampanha((prevState) => {
      return {
        ...prevState,
        [name]: value,
        conta: contaSelected,
      };
    });
  };

  const handleCreateCampanha = (event: FormEvent) => {
    event.preventDefault();
    setCampanha({ ...campanha, id_conta: contaSelected });
    const newCampanha: CampanhaProps = {
      id: campanha.id,
      nome: campanha.nome,
      descricao: campanha.descricao,
      status: campanha.status,
      id_conta: campanha.id_conta,
      posts: campanha.posts,
      data_inicio: campanha.data_inicio,
      data_fim: campanha.data_fim,
    };
    onCreate(newCampanha);
    setCampanha({
      nome: "",
      descricao: "",
      status: "ativo",
      data_fim: "",
      data_inicio: "",
      id_conta: 0,
      posts: [],
    });
  };
  return (
    <div>
      <Modal
        id="modal-campanha"
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
            marginTop: "35px",
            borderRadius: "5px",
            transform: "translate(-50%, -50%)",
            width: 480,
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* <IconButton
            onClick={onClose}
            sx={{ position: "fixed", right: "-30px", top: "-35px" }}
          >
            <CancelOutlinedIcon fontSize="large" />
          </IconButton> */}

          <Typography
            sx={{ textAlign: "center", padding: "10px" }}
            id="modal-modal-title"
            variant="h3"
            component="h1"
          >
            {title}
          </Typography>
          <Box component="form" onSubmit={handleCreateCampanha} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome-campanha"
              label="Nome da campanha"
              name="nome"
              value={campanha.nome ? campanha.nome : itemC?.nome}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="descricao"
              label="Descrição"
              name="descricao"
              value={campanha.descricao ? campanha.descricao : itemC?.descricao}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="data_inicio"
              label="Data início"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={
                campanha.data_inicio ? campanha.data_inicio : itemC?.data_inicio
              }
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              label="Data Fim"
              name="data_fim"
              value={campanha.data_fim ? campanha.data_fim : itemC?.data_fim}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              select
              fullWidth
              required
              id="conta"
              label="Conta"
              name="conta"
              value={
                campanha.id_conta != 0
                  ? campanha.id_conta || ""
                  : itemC?.id_conta || ""
              }
              onChange={handleInputChange}
            >
              {contas.map((option) => (
                <MenuItem
                  onClick={() => {
                    setContaSelected(option.id);
                    setCampanha({ ...campanha, id_conta: option.id });
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
              {itemC?.nome ? <>Atualizar Campanha</> : <>Cadastrar Campanha</>}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalFormCampanha;
