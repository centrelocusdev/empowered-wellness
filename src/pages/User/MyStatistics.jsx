import React, { useEffect, useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import { statistics } from "../../temp_db/statistics";
import Navbar from "../../components/Navbar";
import { Bar, Line } from "react-chartjs-2";
import {
  getAllAssessments,
  getAllAssessmentsSpan,
  getAllMoodTests,
  getAllMoodTestsSpan,
  getUserBasicInfo,
} from "../../API";
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
  const navigate = useNavigate();
  const [moodTests, setMoodTests] = useState();
  const [moodTestId, setMoodTestId] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [stress, setStress] = useState(Array(7).fill(0));
  const [depression, setDepression] = useState(Array(7).fill(0));
  const [anxiety, setAnxiety] = useState(Array(7).fill(0));

  const [graphData, setGraphData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const runIt = async () => {
      const res = await getAllMoodTests();
      const user = await getUserBasicInfo();

      const date = new Date();
      const lastWeek = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
      lastWeek.setDate(lastWeek.getDate() - ((lastWeek.getDay() + 6) % 7) + 1);

      const lastWeekDay = `${lastWeek.getFullYear()}-${(lastWeek.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${(lastWeek.getDate() - 1)
        .toString()
        .padStart(2, "0")}`;

      const today = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${(date.getDate() - 1).toString().padStart(2, "0")}`;

      let resStamp = await getAllMoodTestsSpan({
        start_date: lastWeekDay,
        end_date: today,
      });

      setMoodTests(res);
      setGraphData(resStamp);
      setUserId(user.id);
    }

    runIt();
  },[])

  useEffect(() => {
    const runIt = async () => {
      const s = [];
      const d = [];
      const a = [];
      
      if (graphData)
      graphData.forEach((item) => {
        const date = new Date(item.created_at)
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate().toString().padStart(2, "0");
        const index = labels.indexOf(`${month} ${day}`);
        if (index !== -1) {
          s[index] = item.stress
          d[index] = item.depression
          a[index] = item.anxiety
        }
      });

      const newLabels = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const month = d.toLocaleString("default", { month: "short" });
        const day = d.getDate().toString().padStart(2, "0");
        newLabels.push(`${month} ${day}`);
      }

      console.log(s[0],s[5],d,a,newLabels,"newLabels")
      setLabels(newLabels);
       
      setStress(s);
      setDepression(d);
      setAnxiety(a);      
    };

    runIt();
  }, [graphData]);

  const handleViewClick = async (id) => {
    navigate(`/result?type=mood_test&id=${id}&user_id=${userId}`);
  };

  const handleShareClick = async (id) => {
    setMoodTestId(id);
    setOpen(true);
  };

  const data = {
    labels,
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
                    Wellness Test
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {new Date(d.created_at).toDateString()}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                    <button
                      onClick={(e) => handleViewClick(d.id)}
                      className="hover:text-gray-500"
                    >
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
      </div>
    </>
  );
};

export default MyStatistics;
