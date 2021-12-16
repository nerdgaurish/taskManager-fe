/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import axios from "axios";
import { searchTaskValue } from "./taskSlice";
import { setLoggedOut } from "../reducers/userReducer";
import { parseJwt } from "./CommonMethods";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

const Header = ({
  setSearchTask,
  userAvatar,
  setOpenSideBar,
  openSideBar,
  searchTask,
}) => {
  const token = localStorage.getItem("token");
  const { username } = token ? parseJwt(token) : "";

  const [isAdmin, setisAdmin] = useState(false);

  const getUserData = async () => {
    const {
      data: {
        user: { role },
      },
    } = await axios.get(`http://localhost:4000/api/v1/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    role === "admin" ? setisAdmin(true) : setisAdmin(false);
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = () => {};

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onSearch = (event) => {
    setSearchTask(event.target.value);
    dispatch(searchTaskValue(event.target.value));
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    dispatch(setLoggedOut());
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <img
            src={userAvatar}
            alt="Profile Icon"
            style={{ borderRadius: "10rem", height: "1.6rem", width: "auto" }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem onClick={userLogout}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setOpenSideBar(!openSideBar)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Todo List
          </Typography>

          <Box sx={{ flexGrow: 1, justifyContent: "center" }} />
          {isAdmin ? (
            ""
          ) : (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={onSearch}
                inputProps={{ "aria-label": "search" }}
                autoFocus="true"
                value={searchTask}
              />
            </Search>
          )}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img
                src={userAvatar}
                alt=""
                style={{
                  borderRadius: "10rem",
                  height: "2.6rem",
                  width: "auto",
                }}
              />
            </IconButton>
            <IconButton
              size="large"
              aria-label="logout"
              color="inherit"
              onClick={userLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};



// export default Header;
export const MemoizedHeader = React.memo(Header);
