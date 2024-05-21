import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { AddTaskSchema, TAddTaskSchema } from "../../../lib/validator";
import { AddTaskApi } from "../service/TasksApi";
import useAuth from "../../../Hooks/useAuth";
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
  const { getToken } = useAuth();
  const token = getToken();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAddTaskSchema>({ resolver: zodResolver(AddTaskSchema) });

  const onSubmit = async (data: TAddTaskSchema) => {
    try {
      const response = await AddTaskApi(token, data.TaskName, data.target);
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            Add New Task
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="mt-3">
              <TextField
                {...register("TaskName")}
                id="outlined-required"
                label="Task Name"
                defaultValue=""
                // onChange={(e) => setName(e.target.value)}
                sx={{ mb: 1 }}
              />
              {errors.TaskName && (
                <p className="text-red-500 mb-2">{errors.TaskName.message}</p>
              )}
              <TextField
                {...register("target")}
                id="outlined-required"
                label="target"
                defaultValue=""
                sx={{ mb: 1 }}
              />
              {errors.target && (
                <p className="text-red-500 mb-2">{errors.target.message}</p>
              )}
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
