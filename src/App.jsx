import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";
import PvtRoutes from "./PvtRoutes";
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
import CrisisSupport from "./pages/general/CrisisSupport";
import Feedback from "./pages/general/Feedback";
import Settings from "./pages/User/Settings";
import MyStatistics from "./pages/User/MyStatistics";
import Result from "./pages/User/Result";

function App() {
  return (
    <section>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen bg-light-2 text-center text-4xl font-bold">
            <FaSpinner className="text-primary-dark" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PvtRoutes />}>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/result" element={<Result />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/wellness-measure" element={<WellnessMeasure />} />
            <Route path="assessments" element={<Assessments />}>
              <Route path=":type" element />
            </Route>
            <Route path="/vision-board" element={<VisionBoard />} />
            <Route path="mindfulness" element={<Mindfulness />}>
              <Route path=":type" element />
            </Route>
            <Route
              path="/message-professional"
              element={<MessageProfessional />}
            />
            <Route path="/support-circle" element={<SupportCircle />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/my-statistics" element={<MyStatistics />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </section>
  );
}

export default App;
