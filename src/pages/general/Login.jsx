import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import yoga from "../../assets/images/yoga.png";
import InputPrimary from "../../components/InputPrimary";
import { Link } from "react-router-dom";
import { forgetPassword, login } from "../../API";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirectTo = state?.from ? state.from : '/dashboard'

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "",
  });

  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [ShowChangePassword, setShowChangePassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    if (!showForgetPassword) {
      const res = await login(formData);

      res && navigate(redirectTo);
      res && setFormData({ email: "", password: "" });
    } else {
      const res = await forgetPassword(formData.email);
      console.log(res);
      res.status == "OK" && setShowChangePassword(true);
    }
  };

  const handleForgetPasswordClick = () => {
    setShowForgetPassword(true);
  };

  const handlePasswordChange = (e) => {
    setChangePassword((rest) => ({
      ...rest,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePasswordSubmit = async () => {
    const res = await forgetPassword(changePassword);
    console.log(res);
    navigate("/login");
  };

  return (
    <section className="md:flex items-center justify-center md:bg-light-pink min-h-screen">
      <div className="md:flex gap-16 md:m-12 bg-white p-6 md:px-12 py-8 rounded-xl">
        <div className="hidden md:block">
          <img src={yoga} alt="yoga image" className="h-[500px]" />
        </div>
        <div className="">
          <h2 className="md:text-4xl text-3xl text-fade-pink">
            Welcome to <span className="block">empowered wellness</span>
          </h2>

          {!ShowChangePassword ? (
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <InputPrimary
                label={"email"}
                name={"email"}
                placeholer={"johnedoe@gmai.com"}
                width={"full"}
              />
              {!showForgetPassword && (
                <>
                  <InputPrimary
                    label={"password"}
                    name={"password"}
                    placeholer={"password"}
                    width={"full"}
                  />
                  <button
                    onClick={handleForgetPasswordClick}
                    className=" text-sm text-right w-full text-sky-500 hover:text-gray-500"
                  >
                    forget password
                  </button>
                </>
              )}
              <button className="bg-gray-900 text-white rounded-lg text-center py-2 mt-5 w-full text-xl">
                Submit
              </button>
            </form>
          ) : (
            <form
              onChange={handlePasswordChange}
              onSubmit={handleChangePasswordSubmit}
            >
              <InputPrimary
                label={"old password"}
                name={"old_password"}
                type={"password"}
                placeholer={"old password"}
                width={"full"}
              />
              <InputPrimary
                label={"new password"}
                name={"new_password"}
                type={"password"}
                placeholer={""}
                width={"full"}
              />
              <button className="bg-gray-900 text-white rounded-lg text-center py-2 mt-5 w-full text-xl">
                Submit
              </button>
            </form>
          )}

          <p className="text-gray-500 my-2">
            Don't have an account? register{" "}
            <Link to="/register" className="text-sky-500 underline">
              here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
