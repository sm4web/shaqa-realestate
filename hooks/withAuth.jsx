import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (Component) => {
  const Auth = (props) => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    useEffect(() => {
      if (!user)
        router.push({
          pathname: "/login",
        });
    });

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
