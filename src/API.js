import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "https://ew.thedelvierypointe.com/api";
const refresh_token = Cookies.get("refresh-token");

// setInterval(() => {
//   if (refresh_token) {
//     axios.post(`${url}/token/refresh/`, {refresh: refresh_token}).then(res => {
//       Cookies.set('access-token', res.data.access)
//     })
//   }
// }, 3600)

const headers = {
  Authorization: `Bearer ${Cookies.get("access-token")}`,
  "content-type": "multipart/form-data",
};

export const register = async (formData) => {
  const res = await axios.post(`${url}/register/`, formData);
  Cookies.set("access-token", res.data.access);
  Cookies.set("refresh-token", res.data.refresh);
  try {
    toast.success("user logged in successfuly");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const login = async (formData) => {
  const res = await axios.post(`${url}/login/`, formData);
  Cookies.set("access-token", res.data.access);
  Cookies.set("refresh-token", res.data.refresh);
  try {
    toast.success("user logged in successfuly");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const forgetPassword = async (email) => {
  try {
    const res = await axios.post(`${url}/password_reset/`, { email });
    return res.data;
  } catch (err) {
    console.log(err);
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

export const updateUserInfo = async (formData) => {
  try {
    const res = await axios.patch(`${url}/update-user-info/`, formData, {
      headers,
    });
    res.data && toast.success("update user profile info");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const updateUserProfie = async (formData) => {
  try {
    const res = await axios.patch(`${url}/update_profile/`, formData, {
      headers,
    });
    res.data && toast.success("update user profile info");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const UpdatePassword = async (formData) => {
  try {
    console.log(formData.newPassword, formData.confirmPassword)
    if(formData.newPassword != formData.confirmPassword) {
      toast.error('Confirm password does not match')
      return
    }
    const res = await axios.put(`${url}/change-password/`, {old_password: formData.currentPassword, new_password: formData.newPassword}, {
      headers,
    });
    res.data && toast.success("update user profile info");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const moodTest = async (formData) => {
  try {
    console.log(formData);
    const res = await axios.put(`${url}/mood-data/`, formData, { headers });
    toast.success("your response has been recorded");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAllJournals = async () => {
  try {
    const res = await axios.get(`${url}/journal/`, { headers });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const createJournal = async (formData) => {
  try {
    if (!formData.title) {
      toast.error("Title can not be empty");
      return;
    }
    const res = await axios.put(`${url}/journal/`, formData, { headers });
    toast.success("your new journal has been added");
    return res.data;
  } catch (err) {
    err.response.data?.image[0] && toast.error("Please select an image");
    err.response.data?.text[0] && toast.error("Please enter description");
    return;
  }
};

export const updateJournal = async (formData) => {
  try {
    const res = await axios.patch(`${url}/journal/`, formData, { headers });
    toast.success("Journal has been updated");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const deleteJournal = async (id) => {
  try {
    const res = await axios.delete(`${url}/journal/`, {
      data: { id },
      headers,
    });
    toast.success("The journal has been deleted");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAssessmentsMeta = async () => {
  try {
    const res = await axios.get(`${url}/assessment/`, { headers });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAssessmentQuestions = async (id) => {
  try {
    const res = await axios.get(
      `${url}/assessment/${id}/questions/`,{ headers });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getCompletedAssessments = async () => {
  try {
    const res = await axios.get(`${url}/assessment/user-responses/`, {
      headers,
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const saveAssessment = async (response) => {
  try {
    const res = await axios.post(`${url}/assessment/save/`, response, {headers});
    toast.success('Your response has been recorded')
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAudioFiles = async () => {
  try {
    const res = await axios.get(`${url}/audio/`, { headers });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getMessages = async () => {
  try {
    const res = await axios.get(`${url}/user/messages/`, { headers });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const markMessageAsRead = async (message_id) => {
  try {
    const res = await axios.put(`${url}/user/messages/${message_id}/read/`, {
      headers,
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const sendMessage = async (formData) => {
  try {
    const res = await axios.post(`${url}/user/send-message/`, formData, {
      headers,
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};
