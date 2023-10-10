import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import yoga from "../../assets/images/yoga.png";
import InputPrimary from "../../components/InputPrimary";
import { Link } from "react-router-dom";
import { register } from "../../API";

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData)
    res && navigate('/dashboard')
    res && setFormData({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <section className="md:flex items-center justify-center bg-light-pink min-h-screen">
      <div className="md:flex gap-16 md:m-12 bg-white p-6 md:px-12 py-8 rounded-xl">
        <div className="hidden md:block">
          <img src={yoga} alt="yoga image" className="h-[500px]" />
        </div>
        <div className="">
          <h2 className="md:text-4xl text-3xl text-fade-pink">
            Join our <span className="block">empowered wellness</span>
          </h2>

          <form onChange={handleChange} onSubmit={handleSubmit}>
            <div className="md:flex gap-4">
              <InputPrimary
                label={"first name"}
                name={"first_name"}
                placeholer={"John"}
                width={"full"}
              />
              <InputPrimary
                label={"last name"}
                name={"last_name"}
                placeholer={"Doe"}
                width={"full"}
              />
            </div>
            <div className="md:flex gap-4">
              <InputPrimary
                label={"email"}
                name={"email"}
                placeholer={"johnedoe@email.com"}
                width={"full"}
              />
              <InputPrimary
                label={"mobile"}
                name={"mobile"}
                placeholer={"xxxxxx1234"}
                width={"full"}
              />
            </div>
            <div className="md:flex gap-4">
              <InputPrimary
                label={"password (minimum 8 characters)"}
                name={"password"}
                placeholer={"use at least one lowercase, uppercase, decimal and special symbol"}
                width={"full"}
                type={'password'}
              />
              <InputPrimary
                label={"confirm password"}
                name={"confirm_password"}
                placeholer={"Re-enter your password"}
                width={"full"}
                type={'password'}
              />
            </div>

            <button className="bg-gray-900 text-white rounded-lg text-center py-2 w-full mt-5 text-xl">
              Submit
            </button>
          </form>

          <p className="text-gray-500 my-2">
            Already have an account? login{" "}
            <Link to="/login" className="text-sky-500 underline">
              here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
