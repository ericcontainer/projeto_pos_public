import { IconButton, Paper, TableBody, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";

interface dataField {
  id: number;
  conta: string;
  post: string;
  campanha: string;
  data: string;
  hora: string;
  executada: boolean;
}

const AgendamentoTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: colors.grey[700],
      color: colors.grey[100],
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const data = [
    {
      id: 123,
      conta: "@_eric_dev",
      post: "Post 1 da campanha 1",
      campanha: "campanha1",
      data: "24/06/2024",
      hora: "13:30",
      executada: false,
    },
    {
      id: 124,
      conta: "@_eric_dev",
      post: "Post 1 da campanha 1",
      campanha: "campanha1",
      data: "24/06/2024",
      hora: "13:30",
      executada: true,
    },
  ];
  return (
    <>
      {data.length > 0 ? (
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>CONTA</StyledTableCell>
                  <StyledTableCell>POST</StyledTableCell>
                  <StyledTableCell>CAMPANHAS</StyledTableCell>
                  <StyledTableCell>DATA</StyledTableCell>
                  <StyledTableCell>HORA</StyledTableCell>
                  <StyledTableCell>EXECUTADA</StyledTableCell>
                  <StyledTableCell>EDITAR</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item: dataField) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.conta}</TableCell>
                    <TableCell>{item.post}</TableCell>
                    <TableCell>{item.campanha}</TableCell>
                    <TableCell>{item.data}</TableCell>
                    <TableCell>{item.hora}</TableCell>
                    {item.executada ? (
                      <TableCell width={"20"} align={"center"}>
                        {<CheckCircleOutlineOutlinedIcon />}
                      </TableCell>
                    ) : (
                      <TableCell width={"20"} align={"center"}>
                        {<AlarmOutlinedIcon />}
                      </TableCell>
                    )}
                    <TableCell width={"20"}>
                      {
                        <IconButton onClick={() => console.log(item.id)}>
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
      ) : (
        <>
          <h1>Crie seu Primeiro Agendamento</h1>
        </>
      )}
    </>
  );
};
export default AgendamentoTable;
