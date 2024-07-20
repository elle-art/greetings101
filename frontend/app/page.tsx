//Home or About page? - click on "Logo"
'use client'
import { Grid, Box, Typography, SvgIconProps } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import HeaderWithIcon from '@/app/layout/text-formats/TextHeadings';

const Dashboard = () => {
  return (
    <PageContainer title="Courses" description="this is the Courses Page">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderWithIcon icon={null} variant="h1" title="Welcome!" />
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}

export default Dashboard;
