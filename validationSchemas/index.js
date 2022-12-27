import * as Yup from "yup";

export const userRegisterationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid Email Address"),
  password: Yup.string().required("Required").min(3),
});
