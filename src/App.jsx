import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Journal from "./pages/User/Journal";
import Assessments from "./pages/User/Assessments";
import WellnessMeasure from "./pages/User/WellnessMeasure";
import MessageProfessional from "./pages/User/MessageProfessional";
import Mindfulness from "./pages/User/Mindfulness";
import SupportCircle from "./pages/User/SupportCircle";
import VisionBoard from "./pages/User/VisionBoard";
const Home = lazy(() => import("./pages/general/Home"));
const Register = lazy(() => import("./pages/general/Register"));
const Login = lazy(() => import("./pages/general/Login"));
const Index = lazy(() => import("./pages/User/Index"));
import Navbar from "./components/Navbar";

function App() {
  return (
    <section>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-light-2 text-center text-4xl font-bold">
            <FaSpinner className="text-primary-dark" />
          </div>
        }
      >
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Index />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/wellness-measure" element={<WellnessMeasure />} />
          <Route path="assessments" element={<Assessments />}>
            <Route path=":type" element />
          </Route>
          <Route path="/vision-board" element={<VisionBoard />} />
          <Route path="mindfulness" element={<Mindfulness />}>
            <Route path=":type" element />
            </Route>
          <Route path="/message-professional" element={<MessageProfessional />} />
          <Route path="/support-circle" element={<SupportCircle />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </section>
  );
}

export default App;
