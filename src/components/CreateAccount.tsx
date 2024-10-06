import { useNotify, useRedirect, useDataProvider } from "react-admin";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

export const CreateAccount = ({ dataProvider }: any) => {
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
  // const dataProvider = useDataProvider();

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

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const result = await dataProvider.create("users", {
          data: { name, email, password },
        });

        if (result && result.data) {
          console.log("Create account result:", result);
          notify("Account created successfully", { type: "success" });
          redirect("/login");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        console.error("Error creating account:", error);
        notify("Error creating account", { type: "error" });
      }
    }
  };

  return (
    <div>
      <div>
        <Link to="/" className="text-black hover:text-blue-500">
          Welcome to the Crowd-Sourced Online Data Annotation Platform
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={submit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
        >
          <h1 className="text-2xl font-bold mb-6">Create Account</h1>

          <div className="mb-4">
            <TextField
              fullWidth
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameError ? "Name is required" : ""}
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              label="Email or mobile phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Email is required" : ""}
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? "Password is required" : ""}
            />
          </div>

          <div className="mb-6">
            <TextField
              fullWidth
              label="Re-enter Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match" : ""}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-yellow-500 text-black"
          >
            Create your account
          </Button>

          <div className="flex justify-between mt-4">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
