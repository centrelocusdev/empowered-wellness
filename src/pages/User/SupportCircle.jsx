import React, { useEffect, useState } from "react";
import LargeHeading from "../../components/LargeHeading";
import Navbar from "../../components/Navbar";
import { getAllMoodTests, getUserBasicInfo } from "../../API";
import { FiEye, FiShare2 } from "react-icons/fi";
import ShareDataModal from "../../components/ShareDataModal";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SupportCircle = () => {
  const navigate = useNavigate()
  const [moodTests, setMoodTests] = useState([]);
  const [moodTestId, setMoodTestId] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const runIt = async () => {
      const res = await getAllMoodTests();
      setMoodTests(res);
      const user = await getUserBasicInfo()
      setUserId(user.id)
    };

    runIt();
  }, []);

  const handleShareClick = (id) => {
    setMoodTestId(id);    
    setOpen(true);
  };

  const handleViewClick = (id) => {
    navigate(`/result?type=mood_test&id=${id}&user_id=${userId}`)
  }

  return (
    <>
      <ShareDataModal
        type={"mood test"}
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

        {moodTests?.length ? (
          <table className="mx-auto md:w-4/5 table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">S.N.</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Time Taken</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moodTests.map((d, i) => (
                <tr key={d.id} className="">
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    {i + 1}
                  </td>
                  <td className="px-6 py-3 text-left whitespace-nowrap capitalize">
                    mood test
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
        ) : (
          <div className="w-full flex justify-center text-3xl text-gray-400">
            <FaSpinner />
          </div>
        )}
      </div>
    </>
  );
};

export default SupportCircle;
