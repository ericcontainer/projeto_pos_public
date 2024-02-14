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
import { ContaProps, EmpresaProps } from "../../entidades/iterfaces";
import { tokens } from "../../theme";

interface CreateContaModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onCreate: (conta: ContaProps) => void;
  empresas: Array<EmpresaProps>;
  itemC: ContaProps | undefined;
}

const ModalFormConta: React.FC<CreateContaModalProps> = ({
  isOpen,
  title,
  onClose,
  onCreate,
  empresas,
  itemC,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [empresaSelected, setEmpresaSelected] = useState<number>();

  const [conta, setConta] = useState<ContaProps>({
    id: 0,
    nome: "",
    descricao: "",
    tipo: "",
    usuario: "",
    senha: "",
    status: "ativo",
    id_empresa: 0,
    campanhas: [],
  });

  useEffect(() => {
    // setConta(() => ({ ...conta, empresa: empresaSelected }));
    if (itemC != undefined) {
      setConta(itemC);
    } else {
      setConta(() => ({ ...conta, empresa: empresaSelected }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemC]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setConta((prevState) => {
      return {
        ...prevState,
        [name]: value,
        empresa: empresaSelected,
      };
    });
  };

  const handleCreateConta = (event: FormEvent) => {
    event.preventDefault();
    setConta({ ...conta, id_empresa: empresaSelected });
    const newConta: ContaProps = {
      id: conta.id,
      nome: conta.nome,
      descricao: conta.descricao,
      tipo: "INSTAGRAM",
      usuario: conta.usuario,
      senha: conta.senha,
      status: conta.status,
      id_empresa: conta.id_empresa,
      campanhas: conta.campanhas,
    };
    onCreate(newConta);
    conta;
    setConta({
      nome: "",
      descricao: "",
      tipo: "",
      usuario: "",
      senha: "",
      status: "ativo",
      id_empresa: 0,
      campanhas: [],
    });
  };
  return (
    <div>
      <Modal
        id="modal-conta"
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
          <Box component="form" onSubmit={handleCreateConta} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome-conta"
              label="Nome da conta"
              name="nome"
              value={conta.nome ? conta.nome : itemC?.nome}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="descricao"
              label="Descrição"
              name="descricao"
              value={conta.descricao ? conta.descricao : itemC?.descricao}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              disabled
              id="tipo"
              label="Rede Social"
              name="tipo"
              value="INSTAGRAM"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuário"
              name="usuario"
              value={conta.usuario ? conta.usuario : itemC?.usuario}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type={"password"}
              id="senha"
              label="Senha"
              name="senha"
              value={conta.senha ? conta.senha : itemC?.senha}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              select
              fullWidth
              required
              id="id_empresa"
              label="Empresa"
              name="id_empresa"
              value={
                conta.id_empresa != 0
                  ? conta.id_empresa
                  : itemC?.id_empresa || ""
              }
              // onChange={handleInputChange}
            >
              {empresas.map((option) => (
                <MenuItem
                  onClick={() => {
                    setEmpresaSelected(option.id);
                    setConta({ ...conta, id_empresa: option.id });
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
              {itemC?.nome ? <>Atualizar Conta</> : <>Cadastrar Conta</>}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalFormConta;
