import { AlertColor } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

interface Props {
  type: AlertColor;
  message: string;
  open: boolean;
}
const Message = (props: Props) => {
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={props.open}
        >
          <Alert severity={props.type} sx={{ width: "100%" }}>
            {props.message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default Message;
