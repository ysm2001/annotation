import { useNotify, useRedirect, useDataProvider } from "react-admin";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

import { useNotify, useRedirect, DataProvider } from "react-admin";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Sparkles } from 'lucide-react';

interface CreateAccountProps {
  dataProvider: DataProvider;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({ dataProvider }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const notify = useNotify();
  const redirect = useRedirect();

  const validateFields = () => {
    let valid = true;

    if (!name) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (!email) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      valid = false;
    } else {
      setConfirmPasswordError(false);
    }

    return valid;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const result = await dataProvider.create("users", {
          data: { name, email, password },
        });

        if (result && result.data) {
          notify("Account created successfully", { type: "success" });
          redirect("/login");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        notify("Error creating account", { type: "error" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Create Your Account</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
        </div>

        <form onSubmit={submit} className="space-y-4 mt-6">
          <TextField
            fullWidth
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />

          <TextField
            fullWidth
            label="Email or Mobile Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Email is required" : ""}
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
            helperText={passwordError ? "Password is required" : ""}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />

          <TextField
            fullWidth
            label="Re-enter Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "Passwords do not match" : ""}
            variant="outlined"
            InputProps={{
              style: { borderRadius: 8 },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Create Your Account
          </Button>

          <div className="flex justify-between mt-4 text-gray-600">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
