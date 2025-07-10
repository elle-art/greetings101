// app/pages/Signup/page.tsx
"use client";
import React, { useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { API_BASE_URL, SIGNUP_ENDPOINT } from "@/utils/constants/api";
import { useCsrfToken } from "@/utils/CsrfContext";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const csrfToken = useCsrfToken();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!csrfToken) {
      setErrorMessage(
        "CSRF token not ready. Please wait a moment and try again."
      );
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${SIGNUP_ENDPOINT}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.push("/pages/Login");
      } else {
        setErrorMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMessage("Something went wrong. Please try again.");
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Start Learning!
          </Button>
        </form>
      </Box>
      <Typography variant="body1">
        Already have an account?
        <Link href="/pages/Login" sx={{ paddingLeft: "5px" }}>
          Log in
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
