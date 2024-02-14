import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

interface IPropsCardDash {
  title: string;
  value: string;
}

const CardDash = (props: IPropsCardDash) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card
      sx={{
        width: 200,
        height: 150,
        mt: 2,
        mb: 2,
        mr: 2,
        backgroundColor: colors.primary[400],
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: "center" }} gutterBottom>
          {props.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 50,
            textAlign: "center",
            mt: 2,
          }}
          variant="h3"
          gutterBottom
        >
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardDash;
