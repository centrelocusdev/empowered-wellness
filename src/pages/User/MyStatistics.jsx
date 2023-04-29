import React, { useEffect, useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import { statistics } from "../../temp_db/statistics";
import Navbar from "../../components/Navbar";
import { Bar, Line } from "react-chartjs-2";
import { getAllAssessments } from "../../API";
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
  const [assessmets, setAssessments] = useState()
  const [assessmentId, setAssessmentId] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const runIt = async () => {
      const res = await getAllAssessments()
      console.log(res)
      setAssessments(res)
    }

    runIt()
  }, [])

  console.log(assessmets)

  const handleShareClick = async (id) => {
    setAssessmentId(id)
    setOpen(true)
  };

  return (
    <>
      <ShareDataModal
        type={"assessment"}
        id={assessmentId}
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
                <th className="px-6 py-3 text-left">Assessment Name</th>
                <th className="px-6 py-3 text-left">Time Taken</th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {assessmets?.map((d, key) => (
                <tr key={key} className="">
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {d.assessment.name}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {new Date(d.created_at).toDateString()}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                    <button onClick={(e) => {}} className="hover:text-gray-500">
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
const depression = [6, 1, 4, 6, 3, 9, 5];
const anxiety = [5, 2, 7, 4, 7, 3, 9];

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
