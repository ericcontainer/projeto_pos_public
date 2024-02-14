import { Avatar, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { tokens } from "../../theme";

interface Props {
  name: string | undefined | null;
  src: string | undefined;
}

const ProfilePhoto = (props: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="center">
          <Avatar
            sx={{ width: 75, height: 75 }}
            alt="Photo Profile"
            src={props.src}
          />
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h5" color={colors.grey[100]}>
            {props.name}
          </Typography>
          <Typography variant="h6" color={colors.grey[400]}>
            StackMedia User
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default ProfilePhoto;
