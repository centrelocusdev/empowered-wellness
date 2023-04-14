import React from "react";
import LargeHeading from "../../components/LargeHeading";
import ButtonPrimary from "../../components/ButtonPrimary";
import { BiShareAlt } from "react-icons/bi"

const SupportCircle = () => {
  return (
    <div className="md:px-8 px-4 md:w-4/5 mx-auto py-4 flex flex-col gap-4">
      <LargeHeading text={"Share how you’re doing"} />

      <h4 className="font-semibold text-2xl text-gray-500 my-4">
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

      <div className="w-fit mx-auto">
      <ButtonPrimary text={'Share your data'} icon={<BiShareAlt />} />
      </div>
    </div>
  );
};

export default SupportCircle;
