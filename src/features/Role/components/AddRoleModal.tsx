import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { TasksApi } from "../../Tasks/service/TasksApi";
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
  const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const token = getToken();
    const getTasks = async () => {
      const response = await TasksApi(token);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.tasks);
      setTasks(jsonData.body.tasks);
    };

    getTasks();
  }, []);
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
                label="Role Name"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
            </FormGroup>
            <FormGroup style={{ maxHeight: "300px", overflowY: "auto" }}>
              {tasks &&
                tasks.map((task) => {
                  return (
                    <FormControlLabel
                      key={task.id}
                      control={<Checkbox id={task.id} />}
                      label={task.name}
                    />
                  );
                })}
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
