import React from "react";
import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";

export const PostList = (props: any) => {
  const [posts, setPosts] = useState([]); // 用于存储获取到的数据
  const dataProvider = useDataProvider(); // 获取 dataProvider

  // 使用 useEffect 钩子在组件挂载时获取数据
  useEffect(() => {
    // 调用 dataProvider 获取 posts 数据
    dataProvider
      .getList("posts", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "DESC" },
        filter: {},
      })
      .then(({ data }: any) => {
        setPosts(data); // 将获取到的数据设置到组件的状态中
      })
      .catch((error) => {
        console.error("Error fetching posts:", error); // 错误处理
      });
  }, [dataProvider]);

  return (
    <div>
      <h1>Annotations</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
