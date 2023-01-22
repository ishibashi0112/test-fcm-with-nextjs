import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { deletePost, getPosts, Post } from "@/lib/firebase/firestore";
import Layout from "@/pages-layout/layout";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      toast.success("削除しました", { position: "top-right" });
      setIsLoading(true);
    } catch (error) {
      toast.error("削除に失敗しました", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const setFireStorePosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
    };

    setFireStorePosts();
  }, []);
  return (
    <Layout>
      <div className="mx-auto">
        <p className="mb-3"> Posts List</p>
        <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li
              className="relative rounded border p-2 shadow-sm hover:bg-gray-50 hover:shadow-md"
              key={post.id}
            >
              <p className="text-sm">{post.title}</p>
              <div className="h-20">{post.body}</div>

              <div className="absolute top-1 right-1">
                <button
                  className="rounded-full px-2 transition hover:bg-gray-200 hover:transition active:bg-gray-300"
                  onClick={() => handleDelete(post.id)}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
