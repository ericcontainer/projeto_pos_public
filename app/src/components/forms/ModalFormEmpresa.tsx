import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { EmpresaProps } from "../../entidades/iterfaces";
import { AuthContext } from "../../contexts/AuthContext";
import { setHistoricoService } from "../../services/commonServices";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (empresa: EmpresaProps) => void;
  update: EmpresaProps | undefined;
  title?: string;
}

const ModalFormEmpresa: React.FC<CreateCompanyModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  update,
  title,
}) => {
  const [empresa, setEmpresa] = useState<EmpresaProps>({
    id: 0,
    cnpj: "",
    descricao: "",
    status: "ativo",
    nome: "",
    contas: [],
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (update != undefined) setEmpresa(update);
  }, [update]),
    [empresa];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setEmpresa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateCompany = () => {
    const newCompany: EmpresaProps = {
      id: empresa.id,
      nome: empresa.nome,
      descricao: empresa.descricao,
      status: empresa.status,
      cnpj: empresa.cnpj,
      contas: empresa.contas,
    };
    onCreate(newCompany);
    setEmpresa({
      cnpj: "",
      descricao: "",
      status: "ativo",
      nome: "",
      contas: [],
    });
    setHistoricoService({
      id: 0,
      usuario:
        auth.userG?.displayName?.toString() ||
        auth.userG?.email?.toString() ||
        "",
      descricao: "Criou Empresa " + JSON.stringify(newCompany),
    });
  };

  return (
    <div>
      <Modal
        id="modal-empresa"
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
          <Box component="form" onSubmit={handleCreateCompany} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome-empresa"
              label="Nome da Empresa"
              name="nome"
              value={empresa.nome ? empresa.nome : update?.nome}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="descricao"
              label="Descrição"
              name="descricao"
              value={empresa.descricao ? empresa.descricao : update?.descricao}
              onChange={handleInputChange}
            />
            {/*<InputLabel id="select-label-status">Status</InputLabel>
             <Select
              labelId="status_empresa"
              required
              id="status"
              value={empresa.status ? empresa.status : update?.status}
              label="Status"
              sx={{
                width: "100px",
              }}
              onChange={handleChangeSelect}
            >
              <MenuItem value={"ativo"}>Ativo</MenuItem>
              <MenuItem value={"inativo"}>Inativo</MenuItem>
            </Select> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="cnpj"
              label="CNPJ"
              name="cnpj"
              value={empresa.cnpj ? empresa.cnpj : update?.cnpj}
              onChange={handleInputChange}
            />
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
              {update?.nome ? <>Atualizar empresa</> : <>Cadastrar empresa</>}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFormEmpresa;
