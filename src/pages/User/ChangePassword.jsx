import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import ButtonPrimary from "../../components/ButtonPrimary";
import SettingsInput from "../../components/SettingsInput";
import { UpdatePassword, getUserBasicInfo } from "../../API";

const ChangePassword = () => {
  const [editable, setEditable] = useState(true);
  const [email, setEmail] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const runIt = async () => {
      const user = await getUserBasicInfo();
      setEmail(user.email);
    };

    runIt();
  }, []);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await UpdatePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setEditable(true)
  };

  return (
    <div>
      <div className="md:flex justify-between w-full border-b">
        <h5 className="md:text-4xl text-2xl text-fade-brown">
          Change Password
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
          isDisbaled={true}
        />
        <SettingsInput
          name={"current_password"}
          type={"password"}
          value={currentPassword}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleCurrentPasswordChange}
        />

        <SettingsInput
          type={"password"}
          name={"new_password"}
          value={newPassword}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleNewPasswordChange}
        />
        <SettingsInput
          type={"password"}
          name={"confirm_password"}
          value={confirmPassword}
          isRequired={true}
          isDisbaled={editable}
          handleChange={handleConfirmPasswordChange}
        />

        {!editable && (
          <ButtonPrimary text={"save changes"} handleClick={handleFormSubmit} />
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
