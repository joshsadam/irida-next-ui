import { gql, useMutation } from "@apollo/client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleIcon from "@mui/icons-material/People";
import {
  Badge,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../hooks/user";
import MainAppBar from "./MainAppBar";
import MainDrawer from "./MainDrawer";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const DRAWER_WIDTH = 240;

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(true);
  const [signout] = useMutation(SIGN_OUT_MUTATION);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    signout();
    signOut();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MainAppBar position="absolute" drawerWidth={DRAWER_WIDTH} open={open}>
        <Toolbar sx={{ pr: `24px` }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            IRIDA NEXT UI
          </Typography>
          <IconButton
            onClick={logout}
            sx={{
              borderRadius: 60,
              backgroundColor: "white",
            }}
          >
            <Stack spacing={1} direction="row">
              <AccountCircleIcon />
              <SettingsOutlinedIcon />
            </Stack>
          </IconButton>
        </Toolbar>
      </MainAppBar>
      <MainDrawer variant="permanent" open={open} drawerWidth={DRAWER_WIDTH}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <Link href={"/projects"}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </Link>
          <Link href={"/teams"}>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItemButton>
          </Link>
        </List>
      </MainDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
