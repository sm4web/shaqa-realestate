import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import InputHandler from "../components/General/InputHandler";
import SimpleSnackbar from "../components/General/Snackbar";
import GoogleAuthButton from "../components/General/GoogleAuthButton";
import { userRegisterationSchema } from "../validationSchemas";
import SideImage from "../assets/images/signin-side.svg";

// Reducers
import { loginWithEmailAndPassword } from "../features/login/loginSlice";
import { userGoogleAuth } from "../features/googleAuth/googleAuthSlice";

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error: normalError } = useSelector((state) => state.login);
  const { error: googleAuthError } = useSelector((state) => state.googleAuth);

  const handleGoogleAuth = () => {
    dispatch(userGoogleAuth(router));
  };

  const handleLogin = (values) => {
    dispatch(loginWithEmailAndPassword({ ...values, router }));
  };

  return (
    <div className="w-full h-screen bg-white">
      <Head>
        <title>Shaqa - Login</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="User registeration page - Shaqa, Real Estate"
          key="Signin-Page"
        />
      </Head>

      {(normalError || googleAuthError) && (
        <SimpleSnackbar
          text={normalError || googleAuthError}
          error
          place={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
      )}

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
            onSubmit={(values) => {
              handleLogin(values);
            }}
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
                {/* <h1 className="text-center my-4 text-main">OR</h1>
                <GoogleAuthButton handleClick={handleGoogleAuth} /> */}
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
