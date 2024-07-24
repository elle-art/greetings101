//Practice page - "Practice"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import PracticeCard from '@/app/components/practice/PracticeCard';
import { IconBarbell } from "@tabler/icons-react";
import HeaderWithIcon from '../../layout/text-formats/TextHeadings';

const Practice = () => {
  return (
    <PageContainer title="Courses" description="this is the Courses Page">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderWithIcon icon={IconBarbell  as React.ComponentType<SvgIconProps>} variant="h1" title="Practice" />
        </Grid>
        <Grid item xs={12}>
          <PracticeCard />
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}

export default Practice;
