import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import yoga from "../../assets/images/yoga.png";
import InputPrimary from "../../components/InputPrimary";
import { Link } from "react-router-dom";
import { login } from "../../API";

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData)
    res && navigate('/user')
    res && setFormData({ email: "", password: "" });
  };

  return (
    <section className="md:flex items-center justify-center bg-light-pink">
      <div className="md:flex gap-16 md:m-12 bg-white p-6 md:px-12 py-8 rounded-xl">
        <div className="hidden md:block">
          <img src={yoga} alt="yoga image" className="h-[500px]" />
        </div>
        <div className="">
          <h2 className="md:text-4xl text-3xl text-fade-pink">
            Welcome to <span className="block">empowered wellness</span>
          </h2>

          <form onChange={handleChange} onSubmit={handleSubmit}>
            <InputPrimary
              label={"email"}
              name={"email"}
              placeholer={"johnedoe@gmai.com"}
              width={"full"}
            />
            <InputPrimary
              label={"password"}
              name={"password"}
              placeholer={"password"}
              width={"full"}
            />

            <button className="bg-gray-900 text-white rounded-lg text-center py-2 w-full mt-5 text-xl">
              Submit
            </button>
          </form>

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
