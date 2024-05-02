import {
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export const Profile = () => {
  const [Email, setEmail] = useState("danieljemmo1@gmail.com");
  const [FName, setFName] = useState("Daniel");
  const [LName, setLName] = useState("Jemmo");
  const [isEditMode, setIsEditMode] = useState(false);

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
                value={FName}
                disabled={!isEditMode}
                size="small"
                onChange={(e) => setFName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                required
                id="outlined-required-mname"
                label="Middle Name"
                value={LName}
                disabled={!isEditMode}
                size="small"
                onChange={(e) => setLName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                required
                id="outlined-required-lname"
                label="Email"
                value={Email}
                disabled
                size="small"
                onChange={(e) => setEmail(e.target.value)}
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
                  bgcolor: "#F58634",
                  ":hover": { bgcolor: "#3E4095" },
                  borderRight: "1px solid white",
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
                  bgcolor: "#F58634",
                  ":hover": { bgcolor: "#3E4095" },
                  borderRight: "1px solid white",
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
