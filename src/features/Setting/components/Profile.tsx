import {
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
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
    <div className="w-3/4 mx-20 mt-10">
      <Card>
        <CardContent>
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
                size="small"
              />
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                required
                id="outlined-required-mname"
                label="Middle Name"
                defaultValue={userData.lastName}
                disabled={!isEditMode}
                size="small"
              />
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                required
                id="outlined-required-email"
                label="Email"
                defaultValue={userData.email}
                disabled
                size="small"
              />
            </FormGroup>
            {isEditMode ? (
              <Button
                color="primary"
                type="submit"
                variant="contained"
                className="bg-primary"
                sx={{
                  mt: 2,
                }}
              >
                Change Profile
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={handleEditProfile}
                sx={{
                  mt: 2,
                }}
                variant="contained"
                className="bg-primary"
              >
                Edit Profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
