//Home or About page? - click on "Logo"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps, Button } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import HeaderWithIcon from '@/app/layout/text-formats/TextHeadings';

const Start = () => {
  return (
    <PageContainer title="Greetings 101" description="An introduction to other cultures">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderWithIcon icon={null} variant="h1" title="Welcome!" />
        </Grid>
        <Grid item xs={3}>
        <Button fullWidth variant="contained" color="primary" href='pages/Signup'>
            Sign up!
          </Button>        
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}

export default Start;
