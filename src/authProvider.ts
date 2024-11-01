import { AuthProvider, HttpError } from "react-admin";
import data from "./users.json";

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    return fetch(`http://54.209.7.226:8080/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new HttpError('Unauthorized', 401, {
            message: 'Invalid username or password',
          });
        }
        return response.json();
      })
      .then((user) => {
        console.log(user);

        if (!user) {
          throw new Error("Invalid username");
        }
        // 保存用户信息到 localStorage，表示用户已登录
        localStorage.setItem("user", JSON.stringify(user));
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  // login: ({ username, password }) => {
  //   const user = data.users.find(
  //     (u) => u.username === username && u.password === password,
  //   );

  //   if (user) {
  //     let { password, ...userToPersist } = user;
  //     localStorage.setItem("user", JSON.stringify(userToPersist));
  //     return Promise.resolve();
  //   }

  //   return Promise.reject(
  //     new HttpError("Unauthorized", 401, {
  //       message: "Invalid username or password",
  //     }),
  //   );
  // },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("user");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
