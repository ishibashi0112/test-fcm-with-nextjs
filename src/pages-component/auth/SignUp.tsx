import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

import { signUp } from "@/lib/firebase/auth";

import { SignInForm } from "./SignIn";

export type SignUpForm = SignInForm & {
  name: string;
};

export const SignUp: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm): Promise<void> => {
    console.log(data);

    try {
      await signUp(data);
      alert("signUpが完了しました");
    } catch (error) {
      console.log(error);
      alert("signUpに失敗しました");
    }
  };

  return (
    <form className="mx-auto w-96 space-y-5 " onSubmit={handleSubmit(onSubmit)}>
      <h3>{router.query.type === "signin" ? "Sign In" : "Sign Up"}</h3>

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

      <label className="relative  block">
        <input
          className="peer w-full rounded-sm focus:placeholder:text-transparent"
          type="text"
          placeholder="name"
          {...register("name")}
        />
        <span className="absolute -top-3 left-2 hidden  bg-white px-1 text-blue-600 transition-all peer-focus:block peer-focus:transition-all">
          name
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
