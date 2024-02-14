import { AlertColor, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { tokens } from "../../theme";

interface Props {
  typeAlert: AlertColor;
  msg: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalAlert = (props: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Modal
        id="modal-empresa"
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.typeAlert == "success" ? (
          <>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                borderRadius: "5px",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: colors.greenAccent[400],
                boxShadow: 24,
                p: 3,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                <TaskAltOutlinedIcon fontSize="large" sx={{ mr: 2 }} />
                {props.msg}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            {" "}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                borderRadius: "5px",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: colors.redAccent[400],
                boxShadow: 24,
                p: 3,
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                <UnpublishedOutlinedIcon fontSize="large" sx={{ mr: 2 }} />
                {props.msg}
              </Typography>
            </Box>
          </>
        )}
      </Modal>
    </>
  );
};
export default ModalAlert;
