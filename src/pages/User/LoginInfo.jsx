import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import ButtonPrimary from "../../components/ButtonPrimary";
import SettingsInput from "../../components/SettingsInput";

const LoginInfo = ({ user }) => {
  const [editable, setEditable] = useState(true);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditClick = () => {
    setEditable((editable) => !editable);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formSubmit clicked");
    const formData = {
      email,
      currentPassword,
      newPassword,
      confirmPassword
    }
  }

  return (
    <div>
      <div className="md:flex justify-between w-full border-b">
        <h5 className="md:text-4xl text-2xl text-fade-brown">
          Login Information
        </h5>

        <ButtonPrimary
          text={"edit"}
          icon={<BiEditAlt />}
          handleClick={handleEditClick}
        />
      </div>

      <div>
        <SettingsInput
          name={"email"}
          value={email}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleEmailChange}
        />
        <SettingsInput
          name={"current_password"}
          type={'password'}
          value={currentPassword}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleCurrentPasswordChange}
        />

        {!editable && (
          <>
            <SettingsInput
              name={"new_password"}
              value={newPassword}
              isRequired={true}
              isDisbaled={editable}
              handleChange={handleNewPasswordChange}
            />
            <SettingsInput
              name={"confirm_password"}
              value={confirmPassword}
              isRequired={true}
              isDisbaled={editable}
              handleChange={handleConfirmPasswordChange}
            />
          </>
        )}

        {!editable && (
          <ButtonPrimary text={"save changes"} handleClick={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default LoginInfo;
