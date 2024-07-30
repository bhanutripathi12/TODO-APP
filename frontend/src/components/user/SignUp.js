import React, { useState } from 'react';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password
    }

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/create`, user)
      .then((res) => {
        localStorage.setItem("Authorization", res.data.token);
        window.location = '/';
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  return (

    <Container maxWidth="sm">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo App
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          Create an account
        </Typography>
        <Box sx={{ width: '100%', boxShadow: 5, borderRadius: 3, my: 3, p: 5 }}>
          <form onSubmit={onSignUp}>
            <TextField
              required
              sx={{ mb: 2, width: '100%' }}
              id="outlined-name-input"
              label="Name"
              placeholder="Steve"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              sx={{ mb: 2, width: '100%' }}
              id="outlined-email-input"
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              sx={{ mb: 2, width: '100%' }}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ mb: 2 }}
              disableElevation
              type="submit" >
              create
            </Button>

          </form>
          <Link to="/signin">Login to My Account</Link>
        </Box>

      </Box>
    </Container>
  )
}

export default SignUp;