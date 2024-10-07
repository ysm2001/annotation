import { useLogin, useNotify, useRedirect } from "react-admin";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

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
      setUsernameHelperText("Username is required");
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

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // 验证字段
    if (validateFields()) {
      login({ username, password })
        .then(() => {
          // 登录成功后重定向
          redirect("/posts"); // 这里定义登录成功后跳转的页面路径
        })
        .catch(() => notify("Invalid username or password"));
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
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-6">Sign In</h1>

          <div className="mb-4">
            <TextField
              fullWidth
              label="Email or mobile phone number"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameHelperText ? usernameHelperText : ""}
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
              helperText={passwordHelperText ? passwordHelperText : ""}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 text-white"
          >
            Sign In
          </Button>

          <div className="flex justify-between mt-4">
            <span>New to Data Annotation?</span>
            <Link to="/create" className="text-blue-500">
              Create your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

