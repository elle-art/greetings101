//Profile page - "View Profile"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps, Button } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import UserDisplay from '@/app/components/viewprofile/UserDisplay';
import { useUser } from '@/utils/user/UserContext';

const UserProfile = () => {
  const {user} = useUser();
  console.log( 'user: , ', user);

  return (
      <PageContainer title="Profile" description=" ">
            <Box mt={3}>
              <Grid container spacing={3} mt={15} sx={{             
              }}>
                {/* ------- Image and name card -------- */}
                <Grid item xs={10}>
                  <UserDisplay />
                </Grid>
                {/* ------- Buttons ------------*/}
                <Grid item xs={2} mt={16}>

                </Grid>
                {/* ---------- Goals and stats ? ---------------*/}
                <Grid item xs={4}>

                </Grid>
                {/* -------------- Vocab List Card ------------- */}
                <Grid item xs={4}>

                </Grid>
                {/* ------------- Certificates -------------- */}
                <Grid xs={4}>
                  
                </Grid>
              </Grid>
            </Box>
      </PageContainer>
  )
}

export default UserProfile;
