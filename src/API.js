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

export const getaudio = async () => {
  try {
    const res = await axios.get(`${url}/audio/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('access-token')}`,
        'content-type': 'multipart/form-data',
      },
    })
    console.log(res.data)
    // res.data && toast.success('update user profile info')
    return res.data
  } catch (err) {
    toast.error(err.response.data.error)
    return
  }
}

export const register = async (formData) => {
  try {
    const res = await axios.post(`${url}/register/`, formData);
    Cookies.set("access-token", res.data.access);
    Cookies.set("refresh-token", res.data.refresh);
    toast.success("user logged in successfully");
    return true;
  } catch (err) {
    err.response.data.email && toast.error(err.response.data.email[0])
    err.response.data.password && toast.error('This password is too short or common')
    toast.error(err.response.data?.error);
    return;
  }
};

export const login = async (formData) => {
  try {
    const res = await axios.post(`${url}/login/`, formData);
    console.log(res.data)
    Cookies.set("access-token", res.data.access);
    Cookies.set("refresh-token", res.data.refresh);
    toast.success("user logged in successfully");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

const headers = {
  Authorization: `Bearer ${Cookies.get("access-token")}`,
  "content-type": "multipart/form-data",
};

export const forgetPassword = async (email) => {
  try {
    const res = await axios.post(`${url}/password_reset/`, { email });
    res.data && toast.success("please check your email address");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const forgetPasswordConfirm = async (formData) => {
  try {
    const res = await axios.post(`${url}/password_reset/confirm/`, formData);
    res.data && toast.success("password changed successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const logout = async () => {
  Cookies.remove("access-token");
  Cookies.remove("refresh-token");
  try {
    const res = await axios.post(`${url}/logout/`, { refresh: refresh_token });
    res.data && toast.success("logging out");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getUserBasicInfo = async () => {
  try {
    const res = await axios.get(`${url}/update_user_info/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const updateUserBasicInfo = async (formData) => {
  try {
    const res = await axios.patch(`${url}/update_user_info/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("update user profile info");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getUserProfile = async () => {
  try {
    const res = await axios.get(`${url}/user_profile/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    // toast.error(err.response.data.error);
    return;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const res = await axios.patch(`${url}/user_profile/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("update user profile info");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const UpdatePassword = async (formData) => {
  try {
    if (formData.newPassword != formData.confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }
    const res = await axios.put(
      `${url}/change-password/`,
      {
        old_password: formData.currentPassword,
        new_password: formData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    res.data && toast.success("Password changed successfully");
    return true;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getDoctorsList = async () => {
  try {
    const res = await axios.get(`${url}/doctors/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAllMoodTests = async () => {
  try {
    const res = await axios.get(`${url}/mood-data/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAllMoodTestsSpan = async (formData) => {
  try {
    const res = await axios.post(`${url}/mood-data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const moodTest = async (formData) => {
  try {
    const res = await axios.put(`${url}/mood-data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your response has been recorded");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const shareMoodTestData = async (formData) => {
  try {
    const res = await axios.put(`${url}/email_mood_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your data has been shared");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const shareMoodTestDataSpan = async (formData) => {
  try {
    const res = await axios.post(`${url}/email_mood_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your data has been shared");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const viewMoodTestData = async (formData) => {
  try {
    const res = await axios.put(`${url}/email_mood_data_response/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const viewMoodTestDataSpan = async (formData) => {
  try {
    const res = await axios.post(`${url}/email_mood_data_response/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAllJournals = async () => {
  try {
    const res = await axios.get(`${url}/journal/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
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
    const res = await axios.put(`${url}/journal/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
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
    const res = await axios.patch(`${url}/journal/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
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

export const shareJournalData = async (formData) => {
  try {
    const res = await axios.put(`${url}/email_journal_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your data has been shared");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const shareJournalDataSpan = async (formData) => {
  try {
    const res = await axios.post(`${url}/email_journal_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your data has been shared");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const viewJournalData = async (formData) => {
  try {
    const res = await axios.put(
      `${url}/email_journal_data_response/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const viewJournalDataSpan = async (formData) => {
  try {
    const res = await axios.post(
      `${url}/email_journal_data_response/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

// Returns the assessment's id, code, name and description
export const getAssessmentsMeta = async () => {
  try {
    const res = await axios.get(`${url}/assessment/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

// Returns all questions and their options.
export const getAssessmentQuestions = async (id) => {
  try {
    const res = await axios.get(`${url}/assessment/${id}/questions/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    console.log(res)
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

// Return All Assessment taken by user.
export const getAllAssessments = async () => {
  try {
    const res = await axios.get(`${url}/assessment/user-responses/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    if (res.error) return;
    else return res.data;
  } catch (err) {
    err.error ? toast.error(err.error) : toast.error(err.response.data.error);
    return;
  }
};

//Returns the assessment of that user for the given time span.
export const getAllAssessmentsSpan = async (formData) => {
  try {
    const res = await axios.post(
      `${url}/assessment/user-responses/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

//For saving an assessment by an user
export const saveAssessment = async (response) => {
  try {
    const res = await axios.post(`${url}/assessment/save/`, response, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.error) {
      toast.error(res.data.error);
      return;
    } else {
      toast.success("your response has been recorded");
      console.log(res.data,"reponse of save assessment ")
      return res.data;
    }
  } catch (err) {
    console.log(err)
    toast.error(err.response.data.error);
    return;
  }
};

export const shareAssessmentData = async (formData) => {
  try {
    const res = await axios.put(`${url}/email_assessment_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your data has been shared");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const shareAssessmentDataSpan = async (formData) => {
  try {
    const res = await axios.post(`${url}/email_assessment_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("your data has been shared");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const viewAssessmentData = async (formData) => {
  try {
    const res = await axios.put(
      `${url}/email_assessment_data_response/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const viewAssessmentDataSpan = async (formData) => {
  try {
    const res = await axios.post(
      `${url}/email_assessment_data_response/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access-token")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAudioFiles = async () => {
  try {
    const res = await axios.get(`${url}/audio/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getMessages = async () => {
  try {
    const res = await axios.get(`${url}/user/messages/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const markMessageAsRead = async (message_id) => {
  try {
    const res = await axios.put(`${url}/user/messages/${message_id}/read/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const sendMessage = async (formData) => {
  try {
    const res = await axios.post(`${url}/send_message/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("message delivered successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getAllVisionBoard = async () => {
  try {
    const res = await axios.get(`${url}/vision_board/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    console.log(res, res.data,"in api get all visionboard")
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const createVisionBoard = async (formData) => {
  try {
    const res = await axios.put(`${url}/vision_board/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("vision board added successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const getVisionBoardSpan = async (formData) => {
  try {
    const res = await axios.post(`${url}/vision_board/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("vision board added successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const removeVisionBoard = async (id) => {
  try {
    const res = await axios.delete(`${url}/vision_board/`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    toast.success("vision board removed successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const updateVisionBoard = async (formData) => {
  try {
    const res = await axios.patch(`${url}/vision_board/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("vision board added successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};

export const shareVisionBoard = async (formData) => {
  try {
    const res = await axios.post(`${url}/email_vision_board_data/`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access-token")}`,
        "content-type": "multipart/form-data",
      },
    });
    res.data && toast.success("vision board added successfully");
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
    return;
  }
};
