//Practice page - "Practice"
'use client'
import { Grid, Box, Typography, SvgIconProps } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import CourseCard from '@/app/components/dashboard/CourseCard';
import { IconNotebook } from "@tabler/icons-react";
import HeaderWithIcon from '../../text-formats/TextHeadings';

const Resources = () => {
  return (
    <PageContainer title="Courses" description="this is the Courses Page">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderWithIcon icon={IconNotebook  as React.ComponentType<SvgIconProps>} variant="h2" title="Resources" />
        </Grid>
        <Grid item xs={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}

export default Resources;
