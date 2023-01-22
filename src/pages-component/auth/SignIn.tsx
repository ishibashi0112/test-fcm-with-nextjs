import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";

import { signIn } from "@/lib/firebase/auth";

export type SignInForm = {
  email: string;
  password: string;
};

export const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = async (data: SignInForm): Promise<void> => {
    console.log(data);

    try {
      await signIn(data);
      alert("signInしました");
    } catch (error) {
      console.log(error);
      alert("signinに失敗しました");
    }
  };

  return (
    <form className="mx-auto w-96 space-y-5 " onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>

      <label className="relative  block">
        <input
          className="peer w-full rounded-sm focus:placeholder:text-transparent"
          type="text"
          placeholder="email"
          {...register("email")}
        />
        <span className="absolute -top-3 left-2 hidden bg-white px-1 text-blue-600 transition-all focus:animate-pulse peer-focus:block peer-focus:transition-all">
          email
        </span>
      </label>

      <label className="relative  block">
        <input
          className="peer w-full rounded-sm focus:placeholder:text-transparent"
          type="text"
          placeholder="password"
          {...register("password")}
        />
        <span className="absolute -top-3 left-2 hidden  bg-white px-1 text-blue-600 transition-all peer-focus:block peer-focus:transition-all">
          password
        </span>
      </label>

      <button
        className="block w-full rounded-sm border border-black bg-black py-2 px-4 text-sm text-white transition hover:bg-white hover:text-black hover:transition active:bg-slate-100 active:opacity-80"
        type="submit"
      >
        submit
      </button>
    </form>
  );
};
