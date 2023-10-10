import React, { useEffect, useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import {
  getAllAssessments,
  getAllJournals,
  getAllMoodTests,
  getUserBasicInfo,
} from "../../API";
import { FiEye, FiShare2 } from "react-icons/fi";
import ShareDataModal from "../../components/ShareDataModal";
import { useNavigate } from "react-router-dom";

const SupportCircle = () => {
  const navigate = useNavigate();
  const [moodTests, setMoodTests] = useState([]);
  const [moodTestId, setMoodTestId] = useState("");

  const [assessments, setAssessments] = useState([]);
  const [assessmentId, setAssessmentId] = useState([]);

  const [journals, setJournals] = useState([]);
  const [jounalId, setJournalId] = useState("");

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [type, setType] = useState('')

  useEffect(() => {
    const runIt = async () => {
      const moodtests_res = await getAllMoodTests();
      setMoodTests(moodtests_res);

      const assessments_res = await getAllAssessments();
      setAssessments(assessments_res);

      const journals_res = await getAllJournals();
      setJournals(journals_res);

      const user = await getUserBasicInfo();
      setUserId(user.id);
    };

    runIt();
  }, []);

  const handleShareClick = (type, id) => {
    if (type == "mood_test") {
      setMoodTestId(id);
      setType('mood_test')
    } else if (type == "journal") {
      setJournalId(id);
      setType('journal')
    } else if (type == "assessment") {
      setType('assessment')
    }
    setOpen(true);
  };

  const handleViewClick = (type, id) => {
    navigate(`/result?type=${type}&id=${id}&user_id=${userId}`);
  };

  const handleAssessmentViewClick = (date) => {
    navigate(`/result?type=assessment&user_id=${userId}&start_date=${date}&end_date=${date}`)
  }

  return (
    <>
      <ShareDataModal
        type={type}
        id={moodTestId}
        handleCloseClick={() => setOpen(false)}
        isOpen={open}
      />
      <Navbar />
      <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4 flex flex-col gap-4">
        <LargeHeading text={"Share how you’re doing"} />
        <h4 className="font-semibold text-2xl text-gray-500 md:my-4">
          Opening up to others can help!
        </h4>
        <p>
          Sometimes you can feel as is you're the only one struggling, feeling
          isolated, lonely and unsettled.
        </p>
        <p>
          Opening up can help because you can realize you're not alone, get
          support, help others recognize similar things in themselves, quiet the
          negative internal "self-talk".
        </p>
        <p>
          Share how you're doing with someone you trust. We call that person a
          member of your support circle. That individual can be your therapist,
          partner, family member or friend.
        </p>

        {moodTests?.length || journals?.length || assessments?.length ? (
          <table className="mx-auto md:w-4/5 table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Date Taken</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moodTests?.map((d, i) => (
                <tr key={d.id} className="">
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    mood test
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    Stress, Depression & Anxiety
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {new Date(d.created_at).toDateString()}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                    <button
                      onClick={(e) => handleViewClick("mood_test", d.id)}
                      className="hover:text-gray-500"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={(e) => handleShareClick("mood_test", d.id)}
                      className="hover:text-gray-500"
                    >
                      <FiShare2 />
                    </button>
                  </td>
                </tr>
              ))}
              {journals?.map((d, i) => (
                <tr key={d.id} className="">
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    Journal
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    {d.title}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {new Date(d.created_at).toDateString()}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                    <button
                      onClick={(e) => handleViewClick("journal", d.id)}
                      className="hover:text-gray-500"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={(e) => handleShareClick("journal", d.id)}
                      className="hover:text-gray-500"
                    >
                      <FiShare2 />
                    </button>
                  </td>
                </tr>
              ))}
              {assessments?.map((d, i) => (
                <tr key={d.id} className="">
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    Assessment
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    {d.name}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap">
                    {d.date}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap flex gap-3 text-xl text-sky-400">
                    <button
                      onClick={(e) => handleAssessmentViewClick(d.date)}
                      className="hover:text-gray-500"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={(e) => handleShareClick("assessment")}
                      className="hover:text-gray-500"
                    >
                      <FiShare2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex justify-center text-3xl text-gray-400">
            No data available
          </div>
        )}
      </div>
    </>
  );
};

export default SupportCircle;
