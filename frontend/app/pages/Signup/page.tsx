// app/pages/Login/page.tsx
'use client'
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Signup = (props: { name: string, email: string; password: string }) => {
    const [name, setName] = useState<string>(props.name);
    const [email, setEmail] = useState<string>(props.email);
    const [password, setPassword] = useState<string>(props.password);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
    
        const response = await fetch('http://localhost:4000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
    
        if (response.ok) {
            const result = await response.json();
            router.push('/pages/Login');
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
        }
    };
    
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, paddingBottom: "20px" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Signup
                </Typography>
                {errorMessage && (
                    <Typography color="error" variant="body2">
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={submitHandler}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        Start Learning!
                    </Button>
                </form>
            </Box>
            <Typography variant='body1'>
                Already have an account? 
                <Link href="/pages/Login"sx ={{paddingLeft: "5px"}}>
                    Log in
                </Link>
            </Typography>
        </Container>
    );
};    

export default Signup;
