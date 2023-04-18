import React, { useEffect, useState } from "react";
import Select from "react-select";
import { countries } from "countries-list";
import { BiEditAlt } from "react-icons/bi";
import ButtonPrimary from "../../components/ButtonPrimary";
import SettingsInput from "../../components/SettingsInput";

const Profile = ({ user }) => {
  const [editable, setEditable] = useState(true);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  const initData = () => {
    setFullname(user.fullname);
    setUsername(user.username);
    setAge(user.age);
    setZip(user.zip);
    setGender(user.gender);
    setCountry(user.country);
  };

  useEffect(() => {
    initData();
  }, []);

  const handleEditClick = () => {
    setEditable((editable) => !editable);
  };

  const countryOptions = Object.entries(countries).map(([code, name]) => ({
    value: code,
    label: name.name,
  }));

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formSubmit clicked");
    const formData = {
      fullname,
      username,
      age,
      zip,
      gender,
      country,
    };

    console.log(formData);
  };

  return (
    <div>
      <div className="md:flex justify-between w-full border-b">
        <h5 className="md:text-4xl text-2xl text-fade-brown">View Profile</h5>

        <ButtonPrimary
          text={"edit"}
          icon={<BiEditAlt />}
          handleClick={handleEditClick}
        />
      </div>

      <form className="mx-auto">
        <SettingsInput
          name={"full_name"}
          value={fullname}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleFullnameChange}
        />
        <SettingsInput
          name={"user_name"}
          value={username}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleUsernameChange}
        />
        <SettingsInput
          name={"age"}
          value={age}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleAgeChange}
        />

        <div className="md:flex justify-between mt-4 py-4 border-b">
          <h4 htmlFor="gender" className="capitalize text-lg">
            gender
            <span className="etxt-sm text-gray-400 lowercase">(requried)</span>
          </h4>

          <div className="flex gap-7 w-1/2">
            <SettingsInput
              name={"gender"}
              type={"radio"}
              value={"male"}
              isDisbaled={editable}
              handleChange={handleGenderChange}
            />
            <SettingsInput
              name={"gender"}
              type={"radio"}
              value={"female"}
              isDisbaled={editable}
              handleChange={handleGenderChange}
            />
          </div>
        </div>

        <div className="md:flex justify-between mt-4 py-4 border-b">
          <h5 className="capitalize text-lg">
            Country
            <span className="etxt-sm text-gray-400 lowercase">(requried)</span>
          </h5>

          <div className="w-1/2">
            <Select
              options={countryOptions}
              value={country}
              onChange={handleCountryChange}
              isDisabled={editable}
              placeholder={country.label}
            />
          </div>
        </div>

        <SettingsInput
          name={"zip"}
          value={zip}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleZipChange}
        />

        {!editable && (
          <ButtonPrimary text={"save changes"} handleClick={handleFormSubmit} />
        )}
      </form>
    </div>
  );
};

export default Profile;
