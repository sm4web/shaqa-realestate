import Head from "next/head";
import Image from "next/image";
import React from "react";
import NonAuthNav from "../components/General/Navbar";
import SideImage from "../assets/images/signin-side.svg";
import { Formik, Form } from "formik";
import InputHandler from "../components/General/InputHandler";
import Link from "next/link";
import { useRouter } from "next/router";
import { userRegisterationSchema } from "../validationSchemas";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      setCredentials({ user: "Saif Mohamed", token: "179hdkj1gou3y41" })
    );
    router.push({
      pathname: "/",
    });
  };

  return (
    <div className="w-full h-full bg-white">
      <Head>
        <title>Shaqa - Login</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="User registeration page - Shaqa, Real Estate"
          key="Signin-Page"
        />
      </Head>

      <div className="h-full flex items-center justify-center p-[5%] md:p-0">
        <main className="w-screen h-full flex items-center justify-evenly">
          <Image
            src={SideImage}
            className="hidden max-w-[640px] max-h-[500px] object-contain md:flex drop-shadow-lg"
            alt="Vector image pointing on a house"
          />
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={userRegisterationSchema}
            // Handle Submit
            onSubmit={handleLogin}
          >
            {(props) => (
              <Form className="min-w-full md:min-w-[500px]">
                <h1 className="text-[32px] text-main font-semibold mb-[40px]">
                  Hello! Welcome back. 🤗
                </h1>

                <InputHandler
                  placeholder={"Write your email."}
                  name={"email"}
                  label={"Email"}
                />

                <InputHandler
                  placeholder={"Write your Password."}
                  name={"password"}
                  label={"Password"}
                  type={"password"}
                />

                <h1 className="hover:fade animate text-main text-md font-medium cursor-pointer my-[32px]">
                  Forgot Password ?
                </h1>

                <button
                  className="animate hover:fade mainBTN w-full"
                  type={"submit"}
                >
                  Sign in
                </button>
                <h1 className="text-center mt-4">
                  Don't have an account?{" "}
                  <Link href={"/register"} className={"mainColor"}>
                    Sign up for free
                  </Link>
                </h1>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default login;
