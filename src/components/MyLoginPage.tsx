import { useLogin, useNotify, useRedirect } from "react-admin";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Sparkles } from 'lucide-react';

export const MyLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const login = useLogin();
  const notify = useNotify();
  const redirect = useRedirect();

  const validateFields = () => {
    let valid = true;

    if (!username) {
      setUsernameError(true);
      setUsernameHelperText("Email or mobile phone number is required");
      valid = false;
    } else {
      setUsernameError(false);
      setUsernameHelperText("");
    }

    if (!password) {
      setPasswordError(true);
      setPasswordHelperText("Password is required");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    return valid;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      login({ username, password })
        .then(() => {
          redirect("/posts");
        })
        .catch(() => notify("Invalid username or password"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Welcome Back!</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Log In</h1>
        </div>

        <form onSubmit={submit} className="space-y-4 mt-4">
          <TextField
            fullWidth
            label="Email or mobile phone number"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            helperText={usernameHelperText}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordHelperText}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition duration-200"
          >
            Sign In
          </Button>

          <div className="flex justify-between mt-4 text-gray-600">
            <span>New to Data Annotation?</span>
            <Link to="/create" className="text-blue-600 hover:underline">
              Create your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};