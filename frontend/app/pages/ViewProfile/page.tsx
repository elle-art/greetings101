//Profile page - "View Profile"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps, Button } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
import getUserFromLocalStorage from "@/utils/user/getUser";
// components
import UserDisplay from '@/app/components/viewprofile/UserDisplay';

const UserProfile = () => {
  const user = getUserFromLocalStorage();

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
                  <Button variant="contained" color="primary" href='pages/Login' sx={{
                        width: '100px',
                        marginTop: '10px',
                        marginLeft: '30%',
                        marginRight: '25px'
                      }}>
                    Edit
                  </Button> 
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
