// app/pages/Login/page.tsx
"use client";
import React, { useState, FormEvent } from "react";
import { API_BASE_URL, LOGIN_ENDPOINT } from "@/utils/constants/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useUser } from "@/utils/user/UserContext";
import { useCsrfToken } from "@/utils/CsrfContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user, setUser } = useUser();
  const csrfToken = useCsrfToken();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken || "",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      console.log("user: ", user);
      window.location.replace("/pages/Dashboard");
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
      <Typography variant="body1">
        Don&apos;t have an account?&nbsp;
        <Link href="/pages/Signup" sx={{ paddingLeft: "5px" }}>
          Signup
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
