import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  useTheme,
  AlertColor,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import { HistoricoProps } from "../../entidades/iterfaces";
import { getHistoricoService } from "../../services/commonServices";
import ModalAlert from "../global/ModalAlert";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

const HistoricoTable = () => {
  const [historicoData, setHistoricoData] = useState<Array<HistoricoProps>>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>("success");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function createCsv() {
    getHistoricoService().then((r) => {
      r.json().then((data) => {
        let rt = "";
        data.data.map((s: HistoricoProps) => {
          rt = rt + " " + s.id + ";" + s.usuario + ";" + s.descricao + "\n";
        });
        const url = window.URL.createObjectURL(new Blob([rt]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = `RelatorioAuditoria.csv`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    });
  }

  const handleData = () => {
    setLoading(true);

    getHistoricoService()
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            if (data) {
              const finalData: Array<HistoricoProps> = [];

              data["data"].map((v: HistoricoProps) => {
                finalData.push(v);
              });

              setHistoricoData(finalData);

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
      <Button
        variant="contained"
        onClick={() => {
          createCsv();
        }}
        style={{
          backgroundColor: colors.greenAccent[800],
          marginRight: "8px",
          marginLeft: "20px",
          color: colors.primary[100],
          padding: 12,
        }}
      >
        <CloudDownloadOutlinedIcon />
        <span style={{ marginLeft: "10px" }}>Download CSV</span>
      </Button>

      <Box
        sx={{
          p: "20px",
        }}
      >
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
                  <strong>CRIADO</strong>
                </TableCell>
                <TableCell>
                  <strong>ATUALIZADO</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.primary[400] }}>
              {historicoData.map((item: HistoricoProps) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.usuario}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default HistoricoTable;
