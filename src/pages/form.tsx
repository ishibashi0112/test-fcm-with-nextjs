import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { createPost } from "@/lib/firebase/firestore";
import Layout from "@/pages-layout/layout";

export type Form = {
  title: string;
  body: string;
};

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      setIsLoading(true);
      await createPost(data);
    } catch (error) {
      console.log(error);
      alert("追加に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <form
        className="mx-auto w-96 space-y-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Posts Form</h3>

        <label className="relative  block">
          <input
            className="peer w-full rounded-sm focus:placeholder:text-transparent"
            type="text"
            placeholder="title"
            {...register("title")}
          />
          <span className="absolute -top-3 left-2 hidden bg-white px-1 text-blue-600 transition-all focus:animate-pulse peer-focus:block peer-focus:transition-all">
            title
          </span>
        </label>

        <label className="relative  block">
          <input
            className="peer w-full rounded-sm focus:placeholder:text-transparent"
            type="text"
            placeholder="body"
            {...register("body")}
          />
          <span className="absolute -top-3 left-2 hidden  bg-white px-1 text-blue-600 transition-all peer-focus:block peer-focus:transition-all">
            body
          </span>
        </label>

        <button
          className="block w-full rounded-sm border border-black bg-black py-2 px-4 text-sm text-white transition hover:bg-white hover:text-black hover:transition active:bg-slate-100 active:opacity-80"
          type="submit"
          disabled={isLoading}
        >
          submit
        </button>
      </form>
    </Layout>
  );
};

export default Home;
