import React, { useEffect, useState } from "react";
import Select from "react-select";
import { countries } from "countries-list";
import { BiEditAlt } from "react-icons/bi";
import ButtonPrimary from "../../components/ButtonPrimary";
import SettingsInput from "../../components/SettingsInput";

const UserBasicInfo = ({ user }) => {
  const [editable, setEditable] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const initData = () => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setMobile(user.mobile);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleEditClick = () => {
    setEditable((editable) => !editable);
  };

  const handleFirstNameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formSubmit clicked");
    const formData = {
      first_name: firstName,
      last_name: lastName,
      mobile
    };

    console.log(formData);
  };

  return (
    <div>
      <div className="md:flex justify-between w-full border-b">
        <h5 className="md:text-4xl text-2xl text-fade-brown">Basic Information</h5>

        <ButtonPrimary
          text={"edit"}
          icon={<BiEditAlt />}
          handleClick={handleEditClick}
        />
      </div>

      <form className="mx-auto">
        <SettingsInput
          name={"first_name"}
          value={firstName}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleFirstNameChange}
        />
        <SettingsInput
          name={"last_name"}
          value={lastName}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleLastNameChange}
        />
        <SettingsInput
          name={"mobile"}
          value={mobile}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleMobileChange}
        />

        {!editable && (
          <ButtonPrimary text={"save changes"} handleClick={handleFormSubmit} />
        )}
      </form>
    </div>
  );
};

export default UserBasicInfo;
