import React, { useEffect, useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import { statistics } from "../../temp_db/statistics";
import Navbar from "../../components/Navbar";
import { Bar, Line } from "react-chartjs-2";
import { getAllAssessments, getAllAssessmentsSpan, getAllMoodTests, getUserBasicInfo } from "../../API";
import { FiEye, FiShare2 } from "react-icons/fi";
import ShareDataModal from "../../components/ShareDataModal";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyStatistics = () => {
  const navigate = useNavigate()
  const [moodTests, setMoodTests] = useState()
  const [moodTestId, setMoodTestId] = useState('')
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [stress, setStress] = useState([])
  const [depression, setDepression] = useState([])
  const [anxiety, setAnxiety] = useState([])

  useEffect(() => {
    const runIt = async () => {
      const res = await getAllMoodTests()

      const date = new Date ()
      const lastWeek = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
      lastWeek.setDate(lastWeek.getDate() - (lastWeek.getDay() + 6) % 7 + 6);

      const lastWeekDay = `${lastWeek.getFullYear()}-${
        (lastWeek.getMonth() + 1).toString().padStart(2, '0')
      }-${(lastWeek.getDate() - 1).toString().padStart(2, '0')}`;

      const today = `${date.getFullYear()}-${
        (date.getMonth() + 1).toString().padStart(2, '0')
      }-${(date.getDate() - 1).toString().padStart(2, '0')}`;
      

      const resStamp = await getAllAssessmentsSpan({
        start_date: lastWeekDay,
        end_date: today
      })
      
      setMoodTests(res)
      setStress(res.map(f => f.stress).slice(-7))
      setDepression(res.map(f => f.depression).slice(-7))
      setAnxiety(res.map(f => f.anxiety).slice(-7))
      const user = await getUserBasicInfo()
      setUserId(user.id)
    }

    runIt()
  }, [])

  const handleViewClick = async (id) => {
    navigate(`/result?type=mood_test&id=${id}&user_id=${userId}`)  }

  const handleShareClick = async (id) => {
    setMoodTestId(id)
    setOpen(true)
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    type: "bar",
    datasets: [
      {
        label: "Stress",
        fill: true,
        backgroundColor: "#2FB3B7",
        borderRadius: 50,
        borderWidth: 0,
        data: stress,
        barThickness: 8,
      },
      {
        label: "Depression",
        fill: true,
        backgroundColor: "#F572B9",
        borderRadius: 50,
        data: depression,
        barThickness: 4,
      },
      {
        label: "Anxiety",
        fill: true,
        backgroundColor: "#EDF04D",
        borderRadius: 50,
        borderWidth: 0,
        data: anxiety,
        barThickness: 8,
      },
    ],
    options: {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 5,
            },
          },
        ],
      },
      barPercentage: 0.8,
      categoryPercentage: 0.9,
    },
  };

  return (
    <>
      <ShareDataModal
        type={"mood test"}
        id={moodTestId}
        handleCloseClick={() => setOpen(false)}
        isOpen={open}
      />
      <Navbar />
      <div className="md:px-8 md:w-4/5 mx-auto py-4">
        <LargeHeading text={"my statistics"} />

        <div className="mt-8  md:overflow-x-hidden overflow-x-scroll">
          <table className="mx-auto md:w-4/5 table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Time Taken</th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {moodTests?.map((d, key) => (
                <tr key={key} className="">
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    Mood Test
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {new Date(d.created_at).toDateString()}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                    <button onClick={(e) => handleViewClick(d.id)} className="hover:text-gray-500">
                      <FiEye />
                    </button>
                    <button
                      onClick={(e) => handleShareClick(d.id)}
                      className="hover:text-gray-500"
                    >
                      <FiShare2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="my-8 h-[16rem] mx-auto w-1/2">
          <Bar data={data} className="" />
        </div>
        <div className="my-8 h-[16rem] mx-auto w-1/2">
          <Line data={avgData} className="" />
        </div>
      </div>
    </>
  );
};

const stress = [2, 5, 3, 5, 8, 3, 7];
// const depression = [6, 1, 4, 6, 3, 9, 5];
// const anxiety = [5, 2, 7, 4, 7, 3, 9];



const sum = 0;

const avgData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  type: "line",
  datasets: [
    {
      label: "stress",
      fill: true,
      borderColor: "#2FB3B7",
      data: stress,
      backgroundColor: "#2FB3B7",
      borderRadius: 50,
      borderWidth: 2,
    },
  ],
  options: {
    responsive: true,
    scale: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
};

export default MyStatistics;
