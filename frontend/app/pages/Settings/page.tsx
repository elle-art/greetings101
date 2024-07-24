//Settings page - "Settings"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import CourseCard from '@/app/components/dashboard/CourseCard';
import { IconSettings } from "@tabler/icons-react";
import HeaderWithIcon from '../../layout/text-formats/TextHeadings';
import DarkModeButton from '../../components/settings/DarkModeButton';

const Settings = () => {
  return (
    <PageContainer title="Settings" description=" ">
    <Box mt={3}>
      <DarkModeButton />
    </Box>
  </PageContainer>
  )
}

export default Settings;
