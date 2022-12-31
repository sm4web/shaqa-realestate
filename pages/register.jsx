import React from "react";
import Head from "next/head";
import Image from "next/image";
import SideImage from "../assets/images/signup-side-svg.svg";
import NonAuthNav from "../components/General/Navbar";
import InputHandler from "../components/General/InputHandler";
import { Formik, Form } from "formik";
import Link from "next/link";
import { userRegisterationSchema } from "../validationSchemas";
import { useRouter } from "next/router";
import { userGoogleAuth } from "../features/googleAuth/googleAuthSlice";
import { registerWithEmailAndPassword } from "../features/register/registerSlice";
import GoogleAuthButton from "../components/General/GoogleAuthButton";
import { useDispatch, useSelector } from "react-redux";
import SimpleSnackbar from "../components/General/Snackbar";

const register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error: normalError } = useSelector((state) => state.register);
  const { error: googleAuthError } = useSelector((state) => state.googleAuth);

  const handleGoogleAuth = () => {
    dispatch(
      userGoogleAuth(() => {
        router.push({
          pathname: "profile-setup",
          query: {
            step: 2,
          },
        });
      })
    );
  };

  const handleRegister = (values) => {
    dispatch(registerWithEmailAndPassword({ ...values, router }));
  };

  return (
    <div className="w-full h-screen bg-white">
      <Head>
        <title>Shaqa - Register</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="User registeration page - Shaqa, Real Estate"
          key="Signup-Page"
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
          />
          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validationSchema={userRegisterationSchema}
            // Handle Submit
            onSubmit={(values) => {
              handleRegister(values);
            }}
          >
            {(props) => (
              <Form className="min-w-full md:min-w-[500px]">
                <h1 className="text-[32px] text-main font-semibold mb-[40px]">
                  Create New Account 🥰
                </h1>

                <InputHandler
                  placeholder={"Write your full name."}
                  name={"fullName"}
                  label={"Full Name"}
                />

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

                <button
                  className="animate hover:fade mainBTN mt-4 w-full"
                  type={"submit"}
                >
                  Sign up
                </button>
                {/* <h1 className="text-center my-4 text-main">OR</h1>
                <GoogleAuthButton handleClick={handleGoogleAuth} /> */}
                <h1 className="text-center mt-4">
                  Already have an account?{" "}
                  <Link href={"/login"} className={"mainColor"}>
                    Sign in
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

export default register;
