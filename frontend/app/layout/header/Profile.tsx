import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import {
  IconChevronDown,
} from "@tabler/icons-react";
import { useUser } from "@/utils/user/UserContext";
import { getUserFromLocalStorage } from "@/utils/user/getUser";
import { API_BASE_URL } from "@/utils/constants/api";
import useFetchPfp from "@/utils/user/getPfp";

const Profile = () => {
  const { user } = useUser();
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const { pfp } = useFetchPfp();

  if (!pfp) {
    return <p>Loading profile picture...</p>;
  }

    const pfpUrl = `https://greetings101-django-api.onrender.com${pfp.url}`
  
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLogout = () => {
    const localUser = getUserFromLocalStorage();
    //need to update backend before removing
    localStorage.setItem('colorMode', user?.preferences.darkModePref || localUser.darkModePref);
    localStorage.removeItem('user');
    window.location.replace("/");
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={pfpUrl}
          alt={pfp.description}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            {user ? user.name : 'user7438'}
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt:0
          },
        }}
      >

        <Box pt={0}>

          <List>
            <ListItemButton component={Link} href="/pages/ViewProfile">
              <ListItemText primary="View Profile" />
            </ListItemButton>
            <ListItemButton component={Link} href="/pages/Settings">
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>

        </Box>
        <Divider />
        <Box mt={2}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

      </Menu>
    </Box>
  );
};

export default Profile;
