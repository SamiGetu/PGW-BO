import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { TasksApi } from "../../Tasks/service/TasksApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRoleSchema, TAddRoleSchema } from "../../../lib/validator";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ChecklistIcon from "@mui/icons-material/Checklist";

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
export const AddTaskModal = ({ existingId }: { existingId: string }) => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: string; target: string }[]>([]);
  const handleClose = () => setOpen(false);
  const { getToken } = useAuth();
  console.log(existingId);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TAddRoleSchema>({ resolver: zodResolver(AddRoleSchema) });

  const onSubmit = async (data: TAddRoleSchema) => {
    console.log(data);
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

  const openTasksModalFromButton = () => {
    getTasks();
    setOpen(true);
  };

  return (
    <div>
      <GridActionsCellItem
        icon={<ChecklistIcon />}
        label="Choices"
        onClick={openTasksModalFromButton}
        color="inherit"
      />
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              </Button>
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
