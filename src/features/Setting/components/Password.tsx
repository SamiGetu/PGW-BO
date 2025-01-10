import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(confirmPassword, newPassword, oldPassword);

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Change Password
      </Typography>
      <FormGroup className="mt-2">
        <TextField
          required
          id="outlined-required oldpassword"
          label="Old Password"
          type="password"
          defaultValue=""
          size="medium"
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="mt-5">
        <TextField
          required
          id="outlined-required newpassword"
          label="New Password"
          type="password"
          defaultValue=""
          size="medium"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="mt-5">
        <TextField
          required
          id="outlined-required confirmpassword"
          label="Confirm Password"
          type="password"
          defaultValue=""
          size="medium"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <Button
        color="secondary"
        sx={{
          mt: 3,
        }}
        variant="contained"
      >
        Change Password
      </Button>
    </div>
  );
};
