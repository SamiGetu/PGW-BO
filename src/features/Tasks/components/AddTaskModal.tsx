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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("opened");
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
            Add New Role
          </Typography>
          <form>
            <FormGroup className="mt-3">
              <TextField
                required
                id="outlined-required"
                label="Task Name"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="outlined-required"
                label="Task Url Pattern"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="outlined-required"
                label="Component Name"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="outlined-required"
                label="Parent Navigation"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="outlined-required"
                label="List Order"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
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
