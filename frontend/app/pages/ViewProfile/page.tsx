//Profile page - "View Profile"
'use client'
import React from 'react';
import { Grid, Box, Typography, SvgIconProps, Button, Card } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components
import UserDisplay from '@/app/components/viewprofile/UserDisplay';
import { useUser } from '@/utils/user/UserContext';
import VocabList from '@/app/components/viewprofile/VocabList';
import VocabListContainer from '@/app/components/viewprofile/VocabListContainer';
import { useCourses } from '@/utils/courses/CourseContext';
import Popout from '@/app/components/shared/Popout';

const UserProfile = () => {
  const container = React.useRef(null);

  return (
    <PageContainer title="Profile" description=" ">
      <Box mt={3} ref={container}>
        <Grid container spacing={3} mt={15} sx={{
        }}>
          {/* ------- Image and name card -------- */}
          <Grid item xs={10}>
            <UserDisplay />
          </Grid>
          {/* ------- Buttons ------------*/}
          <Grid item xs={2} mt={16}>
            <Button variant="contained" color="primary" href='/pages/Settings' fullWidth sx={{ mt: 2 }}>
              Settings
            </Button>

          </Grid>
          {/* ---------- Buttons ---------------*/}
          <Grid item mt={3} xs={4}>
            <Popout label='View my words'>
              <VocabListContainer />
            </Popout>
            <Popout label='View my mistakes'>
              <VocabListContainer />
            </Popout>
          </Grid>
          {/* ------------- Certificates -------------- */}
          <Grid xs={8}>
            <Card sx={{ mt: 6, marginLeft: 4, height: 200 }}>
              <Typography>Certificates</Typography>
            </Card>
          </Grid>
          <Grid xs={12}>
            {/* test components here */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default UserProfile;
