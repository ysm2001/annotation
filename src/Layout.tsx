import React, { ReactNode } from "react";
import { Layout as RALayout, AppBar, UserMenu, MenuItemLink, Logout } from "react-admin";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CheckForApplicationUpdate } from "react-admin";

const MyUserMenu = (props: any) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/profile"
      primaryText="User Profile"
      leftIcon={<AccountCircleIcon />}
    />
    <Logout />
  </UserMenu>
);

const MyAppBar = (props: any) => (
  <AppBar {...props} userMenu={<MyUserMenu />}>
    <Link to="/">
      <img
        src="/path-to-your-logo/logo.png"
        alt="Logo"
        style={{ height: "40px", marginRight: "20px" }} 
      />
    </Link>
    <Typography variant="h6" color="inherit">
      My Application
    </Typography>
  </AppBar>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout appBar={MyAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

export default Layout;
