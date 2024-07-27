//Settings page - "Settings"
'use client'
import React, { FormEvent, useState } from 'react';
import { Grid, Box, Typography, SvgIconProps, TextField, Button } from '@mui/material';
import PageContainer from '@/app/components/container/PageContainer';
// components

import DarkModeButton from '@/app/components/settings/DarkModeButton';
import { useUser } from '@/utils/user/UserContext';

const Settings = () => {
  const { user, setUser } = useUser();
    const [email, setEmail] = useState<string>(user?.email || '');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <PageContainer title="Settings" description=" ">
    <Box mt={3}>
      <DarkModeButton/>
    </Box>
    <Box sx={{ mt: 8, paddingBottom: "20px" }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}
                    <form onSubmit={submitHandler}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                </Box>
  </PageContainer>
  )
}

export default Settings;
