import { ChangeEvent, useContext, useState } from "react";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

const TopbarCustom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [valueSearch, setValueSearch] = useState("");
  const linkStyle = {
    textDecoration: "none",
    color: colors.grey[100],
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>();
  const [anchorElSettings, setAnchorElSettings] =
    React.useState<null | HTMLElement>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSettings(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const openSettings = Boolean(anchorElSettings);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };
  const handleCloseLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signOut!");
      })
      .catch((error) => {
        console.log("Erro no signOut! ", error);
      });
    setAnchorEl(null);
    console.log("close", anchorEl);
    window.location.reload();
  };
  const handleCloseHistorico = () => {
    setAnchorElSettings(null);
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: colors["primary"][400],
          borderRadius: "3px",
        }}
      >
        <InputBase
          onChange={onChange}
          sx={{ ml: 2, flex: 1 }}
          placeholder="Procurar"
        />
        <IconButton
          onClick={() => console.log("Buscar: ", valueSearch)}
          type="button"
          sx={{ p: 1 }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <Badge badgeContent={2} color="secondary">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleClickSettings}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseLogout}>
          <Link style={linkStyle} to="/login">
            Logout
          </Link>
        </MenuItem>
      </Menu>
      <Menu
        id="basic-menu"
        anchorEl={anchorElSettings}
        open={openSettings}
        onClose={handleCloseSettings}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>Configurações</MenuItem>
        <MenuItem onClick={handleCloseHistorico}>
          <Link style={linkStyle} to="/historico">
            Auditoria
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TopbarCustom;
