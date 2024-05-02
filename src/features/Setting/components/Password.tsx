import {
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(confirmPassword, newPassword, oldPassword);

  return (
    <div className="w-3/4 mx-20 mt-10">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
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
              size="small"
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
              size="small"
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
              size="small"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            sx={{
              mt: 3,
              bgcolor: "#F58634",
              ":hover": { bgcolor: "#3E4095" },
              borderRight: "1px solid white",
            }}
            variant="contained"
          >
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
