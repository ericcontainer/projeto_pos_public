import { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  SvgIconProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

import ProfilePhoto from "./ProfilePhoto";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { AuthContext } from "../../contexts/AuthContext";

// interface Props {
//   emailUser: string | undefined | null;
//   photoUser: string | undefined;
//   nameUser: string | undefined | null;
// }

const SideBarCustom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const hstyle = {
    margin: "10px 0 20px 0",
    color: colors.grey[100],
    backgroundColor: "transparent",
  };

  const auth = useContext(AuthContext);

  interface Props {
    title: string;
    to: string;
    icon: React.ComponentType<SvgIconProps>;
    selected_: string;
    setSelected_: React.Dispatch<React.SetStateAction<string>>;
  }
  [];
  const Item = (props: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === props.title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => {
          setSelected(props.title);
        }}
        icon={<props.icon />}
        component={<Link to={props.to} />}
      >
        <Typography>{props.title}</Typography>
      </MenuItem>
    );
  };
  return (
    <>
      <Box>
        <Sidebar collapsed={isCollapsed} backgroundColor="transparent">
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                return {
                  color: disabled ? colors.grey[100] : colors.grey[100],
                  backgroundColor: active ? colors.grey[700] : undefined,

                  "&:hover":
                    level == 0
                      ? {
                          backgroundColor: "#dad5d5",
                          color: "#525252 !important",
                          borderRadius: "2px !important",
                          fontWeight: "bold !important",
                        }
                      : { backgroundColor: "red" },
                };
              },
            }}
          >
            {/* LOGO  */}

            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={
                isCollapsed ? (
                  <KeyboardDoubleArrowRightOutlinedIcon />
                ) : undefined
              }
              style={hstyle}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="right"
                  alignItems="right"
                  ml="15px"
                >
                  <Typography
                    sx={{
                      alignItems: "center",
                      mr: "5px",
                      mt: "5px",
                      fontFamily: "Bebas Neue', sans-serif",
                    }}
                    variant="h4"
                    color={colors.grey[100]}
                  >
                    <Diversity2Icon fontSize="large" />
                    STACKMEDIA
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <ProfilePhoto
                  name={
                    auth.userG?.displayName
                      ? auth.userG?.displayName
                      : auth.userG?.email
                  }
                  src={auth.userG?.photoURL ? auth.userG?.photoURL : ""}
                />
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/"
                icon={HomeOutlinedIcon}
                selected_={selected}
                setSelected_={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[200]}
                sx={{ m: "15px 0 5px 0px" }}
              >
                GERENCIAR
              </Typography>

              <Item
                title="Empresas"
                to="/empresas"
                icon={BusinessIcon}
                selected_={selected}
                setSelected_={setSelected}
              />
              <Item
                title="Contas"
                to="/contas"
                icon={GroupOutlinedIcon}
                selected_={selected}
                setSelected_={setSelected}
              />
              <Item
                title="Campanhas"
                to="/campanhas"
                icon={LibraryBooksOutlinedIcon}
                selected_={selected}
                setSelected_={setSelected}
              />
              <Item
                title="Posts"
                to="/posts"
                icon={PostAddIcon}
                selected_={selected}
                setSelected_={setSelected}
              />
              {/* <Item
                title="Agendamentos"
                to="/agendamentos"
                icon={AccessTimeOutlinedIcon}
                selected_={selected}
                setSelected_={setSelected}
              /> */}

              <Typography
                variant="h6"
                color={colors.grey[100]}
                sx={{ m: "15px 0 5px 0px" }}
              >
                STACKMEDIA
              </Typography>
              <Item
                title="Usuarios"
                to="/usuarios"
                icon={PersonOutlinedIcon}
                selected_={selected}
                setSelected_={setSelected}
              />

              <Item
                title="Ajuda"
                to="/ajuda"
                icon={HelpOutlineOutlinedIcon}
                selected_={selected}
                setSelected_={setSelected}
              />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
};
export default SideBarCustom;
