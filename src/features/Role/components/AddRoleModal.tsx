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
import { AddRoleApi } from "../service/RolesApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRoleSchema, TAddRoleSchema } from "../../../lib/validator";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export const AddRoleModal = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: string; target: string }[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAddRoleSchema>({ resolver: zodResolver(AddRoleSchema) });

  const onSubmit = async (data: TAddRoleSchema) => {
    try {
      const response = await AddRoleApi(token, data.name, data.description, []);
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const token = getToken();
  const getTasks = async () => {
    try {
      const response = await TasksApi(token);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.tasks);
      setTasks(jsonData.body.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "Barlow Condensed, serif" }}
          >
            Add New Role
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="mt-3">
              <TextField
                {...register("name")}
                id="outlined-required"
                label="Role Name"
                defaultValue=""
                sx={{ mb: 2 }}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </FormGroup>
            <FormGroup className="mt-3">
              <TextField
                {...register("description")}
                id="outlined-required"
                label="Role Description"
                defaultValue=""
                sx={{ mb: 2 }}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </FormGroup>
            <FormGroup style={{ maxHeight: "300px", overflowY: "auto" }}>
              {tasks &&
                tasks.map((task) => {
                  return (
                    <FormControlLabel
                      key={task.id}
                      control={
                        <Checkbox {...register("tasks")} value={task.target} />
                      }
                      label={task.target}
                    />
                  );
                })}
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
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
