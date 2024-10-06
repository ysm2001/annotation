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
import jsonServerProvider from "ra-data-json-server";
// import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { MyLoginPage } from "./components/MyLoginPage";
import { CreateAccount } from "./components/CreateAccount";
import { PostList } from "./components/Annotation/PostList";
import React from "react";

const queryClient = new QueryClient(); // 创建 QueryClient 实例
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

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

        {/* react-admin 页面使用 Admin 组件 */}
        <Route
          // path="/admin/*"
          path="*"
          element={
            <Admin
              layout={Layout} // 你自定义的 Layout
              loginPage={MyLoginPage} // 自定义的登录页面
              dataProvider={dataProvider}
              authProvider={authProvider}
            >
              {/* <CustomRoutes>
                <Route
                  path="/annotations"
                  element={<PostList children={undefined} />}
                />
                <Route path="/annotations/:id/edit" element={<PostEdit />} />
                <Route path="/annotations/:id/show" element={<PostShow />} />
              </CustomRoutes> */}
              <Resource
                name="posts"
                options={{ label: "Annotation" }}
                list={ListGuesser}
                edit={EditGuesser}
                show={ShowGuesser}
              />
              <Resource
                name="comments"
                list={ListGuesser}
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
