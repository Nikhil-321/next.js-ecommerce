import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [session, router, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(email, password);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res.error) {
        console.log("error", res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="w-1/2 mx-auto mt-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p className="text-red-500 text-xs">{errors.password?.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link href={"/"} passHref>
              <span className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-dark cursor-pointer">
                {" "}
                Forgot Password?{" "}
              </span>
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Nikhil Taneja. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
