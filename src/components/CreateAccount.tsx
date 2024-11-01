import { useNotify, useRedirect, DataProvider } from "react-admin";
import { useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { Sparkles } from 'lucide-react';

interface CreateAccountProps {
  dataProvider: DataProvider;
}

// 定义可选的标签类型
const AVAILABLE_TAGS = [
  'image_classification',
  'image_annotation',
  'text_classification',
  'audio_classification'
] as const;

type UserTag = typeof AVAILABLE_TAGS[number];

export const CreateAccount: React.FC<CreateAccountProps> = ({ dataProvider }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"annotator" | "academic">("annotator");
  const [selectedTag, setSelectedTag] = useState<UserTag | "">("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [tagError, setTagError] = useState(false);

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

    // 只有Annotator需要选择tag
    if (userType === "annotator" && !selectedTag) {
      setTagError(true);
      valid = false;
    } else {
      setTagError(false);
    }

    return valid;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const userData = {
          name,
          email,
          password,
          userType,
          ...(userType === "annotator" && { tag: selectedTag }), // 只有Annotator包含tag
        };

        const result = await dataProvider.create("users", {
          data: userData,
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>Account Type</InputLabel>
            <Select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value as "annotator" | "academic");
                if (e.target.value === "academic") {
                  setSelectedTag(""); // 清空tag当切换到academic user
                }
              }}
              label="Account Type"
            >
              <MenuItem value="annotator">Annotator</MenuItem>
              <MenuItem value="academic">Academic User</MenuItem>
            </Select>
          </FormControl>

          {userType === "annotator" && (
            <FormControl fullWidth variant="outlined" error={tagError}>
              <InputLabel>Select Annotation Type</InputLabel>
              <Select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value as UserTag)}
                label="Select Annotation Type"
              >
                {AVAILABLE_TAGS.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag.replace('_', ' ').toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
              {tagError && (
                <FormHelperText>Please select an annotation type</FormHelperText>
              )}
            </FormControl>
          )}

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
