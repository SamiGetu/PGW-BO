import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const AddRoleModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(
    "opened",
    email,
    phone,
    firstName,
    middleName,
    lastName,
    password
  );
  return (
    <div>
      <Button
        key="addRole"
        variant="contained"
        sx={{
          bgcolor: "primary.main",
          color: "white",
        }}
        onClick={handleOpen}
        startIcon={<Add />}
      >
        Add&nbsp;&nbsp;&nbsp;&nbsp;
      </Button>
      <Snackbar
        // open={openSnack}
        autoHideDuration={6000}
        // onClose={handleSnackClose}
        message="Role Created Successfully."
        // action={actionSnack}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <form>
            <FormGroup className="mt-2">
              <TextField
                required
                id="outlined-required fname"
                label="First Name"
                defaultValue=""
                size="small"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <TextField
                required
                id="outlined-required mname"
                label="Middle Name"
                defaultValue=""
                size="small"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <TextField
                required
                id="outlined-required lname"
                label="Last Name"
                defaultValue=""
                size="small"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <TextField
                required
                id="outlined-required phone"
                label="Phone"
                defaultValue=""
                size="small"
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <TextField
                required
                id="outlined-required email"
                label="Email"
                defaultValue=""
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <TextField
                required
                id="outlined-required password"
                label="Password"
                type="password"
                defaultValue=""
                size="small"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
            </FormGroup>

            <FormGroup>
              {/* {roles &&
                roles.map((role) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox id={role.id + "x"} onChange={setSelected} />
                      }
                      label={role.name}
                    />
                  );
                })} */}
            </FormGroup>
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
