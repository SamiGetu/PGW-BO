import { Button, FormGroup, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

export const Profile = () => {
  const { getUserData } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const userData = getUserData();
  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditMode(true);
    // Logic to submit the form data
    console.log("Form submitted!");
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        My Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup className="mt-2">
          <TextField
            required
            id="outlined-required-fname"
            label="First Name"
            defaultValue={userData.firstName}
            disabled={!isEditMode}
            size="medium"
          />
        </FormGroup>
        <FormGroup className="mt-5">
          <TextField
            required
            id="outlined-required-mname"
            label="Middle Name"
            defaultValue={userData.lastName}
            disabled={!isEditMode}
            size="medium"
          />
        </FormGroup>
        <FormGroup className="mt-5">
          <TextField
            required
            id="outlined-required-email"
            label="Email"
            defaultValue={userData.email}
            disabled
            size="medium"
          />
        </FormGroup>
        {isEditMode ? (
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
            }}
          >
            Change Profile
          </Button>
        ) : (
          <Button
            color="secondary"
            onClick={handleEditProfile}
            sx={{
              mt: 2,
            }}
            variant="contained"
          >
            Edit Profile
          </Button>
        )}
      </form>
    </div>
  );
};
