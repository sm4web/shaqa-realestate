import axios from "axios";
import { getInitialState } from "../../features/auth/authSlice";

export default axios.create({
  baseURL: "",
  headers: {
    authorization: `Bearer ${getInitialState().token}`,
  },
});
