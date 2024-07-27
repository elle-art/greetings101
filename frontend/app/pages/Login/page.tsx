// app/pages/Login/page.tsx
'use client'
import React, { useState, FormEvent } from 'react';
import { API_BASE_URL, LOGIN_ENDPOINT } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { ToggleColorModeProvider } from '@/app/components/settings/ToggleColorMode';
import { useUser } from '@/utils/user/UserContext';
import getUserFromLocalStorage from '@/utils/user/getUser';
import { User } from '@/types/User';

const Login = (props: { email: string; password: string }) => {
    const [email, setEmail] = useState<string>(props.email);
    const [password, setPassword] = useState<string>(props.password);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { user, setUser } = useUser();

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
    
        const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('user', JSON.stringify(result.user));
            setUser(result.user);
            window.location.replace('/pages/Dashboard');
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
        }
    };
    
    return (
            <Container maxWidth="sm">
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
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                </Box>
                <Typography variant='body1'>
                    Don't have an account? 
                    <Link href="/pages/Signup"sx ={{paddingLeft: "5px"}}>
                        Signup
                    </Link>
                </Typography>
            </Container>
    );
};    

export default Login;
