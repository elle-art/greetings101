//Profile page - "View Profile"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import CourseCard from '@/app/components/dashboard/CourseCard';
import { IconNotebook } from "@tabler/icons-react";
import HeaderWithIcon from '../../layout/text-formats/TextHeadings';

const UserProfile = () => {
  return (
    <PageContainer title="Profile" description=" ">
    <Box mt={3}>
      <Grid container spacing={3}>
        {/* ------- Image and name card -------- */}
        <Grid item xs={6}>
          <HeaderWithIcon icon={IconNotebook  as React.ComponentType<SvgIconProps>} variant="h2" title="Profile" />
        </Grid>
        {/* ------- Buttons ------------*/}
        <Grid item xs={6}>
          <CourseCard />
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
