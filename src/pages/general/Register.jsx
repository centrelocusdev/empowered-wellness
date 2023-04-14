import React, { useState } from "react";
import yoga from "../../assets/images/yoga.png";
import InputPrimary from "../../components/InputPrimary";
import {toast} from "react-toastify"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success('User Registered!')
    setFormData({
      name: "",
      email: "",
      password: ""
    })
  };

  return (
    <section className="md:flex items-center justify-center bg-light-pink">
      <div className="md:flex gap-16 md:m-12 bg-white p-6 md:px-12 py-8 rounded-xl">
        <div className="hidden md:block">
          <img src={yoga} alt="yoga image" className="h-[500px]" />
        </div>
        <div className="">
          <h2 className="md:text-4xl text-3xl text-fade-pink">
            Join our <span className="block">empowered wellness</span>
          </h2>

          <form onChange={handleChange} onSubmit={handleSubmit}>
            <InputPrimary
              label={"name"}
              name={"name"}
              placeholer={"John Doe"}
              width={'full'}
            />
            <InputPrimary
              label={"email"}
              name={"email"}
              placeholer={"johnedoe@gmai.com"}
              width={'full'}
            />
            <InputPrimary
              label={"password"}
              name={"password"}
              placeholer={"password"}
              width={'full'}
            />

            <button className="bg-gray-900 text-white rounded-lg text-center py-2 w-full mt-5 text-xl">
              Submit
            </button>
          </form>

          <p className="text-gray-500 my-2">
            Already have an account? login{" "}
            <a href="/login" className="text-sky-500 underline">
              here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
