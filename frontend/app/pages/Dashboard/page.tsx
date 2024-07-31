//Class Dashboard page - "Courses"
'use client'
import { Grid, Box, SvgIconProps } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import CourseCard from '@/app/components/dashboard/CourseCard';
import InactiveCourseCard from '@/app/components/dashboard/InactiveCourseCard';
import { IconHome } from "@tabler/icons-react";
import HeaderWithIcon from '@/app/layout/text-formats/TextHeadings';
import { useUser } from '@/utils/user/UserContext';

const Dashboard = () => {
  const {user} = useUser();
  console.log('Current user:', user);
  
  return (
    <PageContainer title="Courses" description="this is the Courses Page">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderWithIcon icon={IconHome  as React.ComponentType<SvgIconProps>} variant="h1" title="My Courses" />
        </Grid>
        <Grid item xs={12}>
          <CourseCard />
        </Grid>
        <Grid item xs={12}>
          <HeaderWithIcon icon={null} variant="h2" title="Additional Learning" />
        </Grid>
        <Grid item xs={12}>
          <InactiveCourseCard />
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}


export default Dashboard;
