import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { MyLoginPage } from "./components/MyLoginPage";
import { CreateAccount } from "./components/CreateAccount";
import { UserTaskmanagement } from "./components/UserTaskmanagement";
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import RatingPage from "./components/Rating"
import { PostList } from "./components/Annotation/PostList";
import React from "react";
import TaskHall from "./components/TaskHall";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* HomePage 和 CreateAccount 页面不使用 react-admin 的 Layout */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create"
          element={<CreateAccount dataProvider={dataProvider} />}
        />

        <Route
          path="*"
          element={
            <Admin
              layout={Layout}
              loginPage={MyLoginPage}
              dataProvider={dataProvider}
              authProvider={authProvider}
            >
              <CustomRoutes>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/rating/:taskId" element={<RatingPage />} />
              </CustomRoutes>
              <Resource
                name="tasks"
                options={{ label: "Task Management" }}
                list={UserTaskmanagement}
                edit={EditGuesser}
                show={ShowGuesser}
              />
              <Resource
                name="unclaimedtasks"
                options={{ label: "Task Hall" }}
                list={TaskHall}
                edit={EditGuesser}
                show={ShowGuesser}
              />
            </Admin>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
