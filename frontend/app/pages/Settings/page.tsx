//Settings page - "Settings"
"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Image from 'next/image';
import PageContainer from "@/app/components/container/PageContainer";
import DarkModeButton from "@/app/components/settings/DarkModeButton";
import { API_BASE_URL, getCSRFToken, UPDATE_USER_ENDPOINT } from "@/utils/constants";
import { Picture } from "@/types/User";
import { useUser } from "@/utils/user/UserContext";
import Cookies from "js-cookie";
import ColorPicker from "@/app/components/settings/ColorPicker";
import useFetchPfp, { useFetchPfpOptions } from "@/utils/user/getPfp";

const Settings = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]); 

  const { pfp } = useFetchPfp();
  const { pfpOptions } = useFetchPfpOptions();

  if (!pfp) {
    return <p>Loading profile picture...</p>;
  }

  const pfpUrl = `${API_BASE_URL}${pfp.url}`

  const updateUserInfo = async (name: string | null, email: string | null, pfp: number | null, pfColor: string | null) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    const updatedUser = { ...user };

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (pfp) updatedUser.pfp = pfp;
    if (pfColor) updatedUser.preferences.pfColor = pfColor;

    const csrfToken = getCSRFToken();
    console.log('CSRF Token:', Cookies.get('csrftoken'));
    const response = await fetch(`${API_BASE_URL}${UPDATE_USER_ENDPOINT}${user.id}/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
    } else {
      console.error('Failed to update user preference');
    }
  };

  const changePfp = async (picture: Picture) => {
    try {
      await updateUserInfo(null, null, picture.id, null);
    } catch (error) {
      console.error("Profile picture update unsuccessful.", error);
    }
  }

  return (
    <PageContainer title="Settings" description=" ">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box mt={3} mr={2}>
            <TextField
              label="Name"
              variant="outlined"
              value={user?.name}
              onChange={(e) => {
                updateUserInfo(e.target.value, null, null, null);
              }}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={user?.email}
              onChange={(e) => {
                setEmail(e.target.value);
                updateUserInfo(null, e.target.value, null, null);
              }}
              fullWidth
              sx={{ mt: 3, mb: 4 }}
            />
            <Link href="#">Change Password</Link>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h3" mb={3}>
            Change Profile Picture
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box
                        sx={{
                          width: 150,
                          height: 150,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          marginRight: 2,
                          marginBottom: 2,
                          border: '2px solid white',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                      <Image src={pfpUrl} width={150} height={150} alt={pfp.description} priority/>
                    </Box>
            </Grid>
            <Grid item xs={12} md={9} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Grid container spacing={1} sx={{ display: "flex" }}>
                {pfpOptions.map((picture: Picture) => {
                  const url = `${API_BASE_URL}${picture.url}`

                  return (
                    <Grid item xs={3} md={3} key={picture.id} sx={{ display: "flex", justifyContent: "right" }}>
                      <Box
                      onClick={() => changePfp(picture)}
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '10%',
                          overflow: "hidden",
                          border: '2px solid white',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          cursor: 'pointer',
                        }}
                        
                      >
                        <Image src={url} width={100} height={100} alt={picture.description} />
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="h3" mt={3} mb={3}>
            Change Theme Color
          </Typography>
          <ColorPicker updateColor={updateUserInfo} />
          <Grid item xs={12}>
        <DarkModeButton />
      </Grid>
        </Grid>
      </Grid>
    </PageContainer >
  );
};

export default Settings;
