import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../global/Header";

const Ajuda = () => {
  return (
    <>
      <Header title="Ajuda" subtitle="Dúvidas frequentes" />
      <Box
        sx={{
          p: "20px",
        }}
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">O que é o MediaStack?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              O MediaStack é sistema B2B de agendamento de post em rede social
              que permite que as empresas programem suas postagens de mídia
              social para serem publicadas em horários específicos.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Quais são os benefícios de usar o StackMedia?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>Conveniência ao programar postagens com antecedência</li>
              <li>Economia de tempo ao evitar publicações manuais</li>
              <li>
                Manter uma presença consistente nas redes sociais mesmo quando
                ocupado
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Primeiros passos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>Cadastre uma empresa</li>
              <li>Cadastre no StackMedia a conta da RedeSocial</li>
              <li>Crie uma campanha</li>
              <li>Cadastre o Post que será postado</li>
              <li>Realize o agendamento</li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Ajuda;
