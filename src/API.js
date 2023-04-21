import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "https://ew.thedelvierypointe.com/api";
const access_token = Cookies.get("access-token");
const refresh_token = Cookies.get("refresh-token");

// setInterval(() => {
//   if (refresh_token) {
//     axios.post(`${url}/token/refresh/`, {refresh: refresh_token}).then(res => {
//       Cookies.set('access-token', res.data.access)
//     })
//   }
// }, 3600)

export const register = async (formData) => {
  try {
    const res = await axios.post(`${url}/register/`, formData);
    Cookies.set("access-token", res.data.access);
    Cookies.set("refresh-token", res.data.refresh);
    toast.success("user logged in successfuly");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/login/`, formData);
    Cookies.set("access-token", res.data.access);
    Cookies.set("refresh-token", res.data.refresh);
    toast.success("user logged in successfuly");
    return true;
  } catch (err) {
    console.log(err)
    toast.error(err.response.data.error);
    return;
  }
};

export const logout = async () => {
  Cookies.remove("access-token");
  Cookies.remove("refresh-token");
  try {
    console.log(refresh_token);
    const res = await axios.post(`${url}/logout/`, { refresh: refresh_token });
    res.data && toast.success("logging out");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};
