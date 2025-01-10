import { Add } from "@mui/icons-material";
import { Box, Button, FormGroup, Snackbar, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export const AddComponentModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ fontFamily: "Barlow Condensed, serif" }}>
      <Button
        key="addRole"
        variant="contained"
        sx={{
          color: "white",
          fontWeight: "500",
          background: "#3E4095",
          "&:hover": {
            background: "#3E4095",
          },
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
          <h1 className="text-2xl font-bold"> Add New Component</h1>
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
                label="Has Space"
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
            <div className="flex justify-end items-center gap-5 my-5">
              <Button type="submit" variant="outlined" onClick={handleClose}>
                Close
              </Button>{" "}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: "white",
                  fontWeight: "500",
                  background: "#3E4095",
                  "&:hover": {
                    background: "#3E4095",
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
