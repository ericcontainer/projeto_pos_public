import Box from "@mui/material/Box";

const Header = (props: { title: string; subtitle: string }) => {
  return (
    <Box m="20px">
      <h2>{props.title}</h2>
      <h6>{props.subtitle} </h6>
    </Box>
  );
};
export default Header;
