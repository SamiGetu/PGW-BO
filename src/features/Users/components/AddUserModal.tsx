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
import { RolesApi } from "../../Role/service/RolesApi";
import useAuth from "../../../Hooks/useAuth";
import { AddUserApi } from "../service/UsersApi";
import { useForm } from "react-hook-form";
import { AddUserSchema, TAddUserSchema } from "../../../lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getToken } = useAuth();
  const token = getToken();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAddUserSchema>({ resolver: zodResolver(AddUserSchema) });

  const onSubmit = async (data: TAddUserSchema) => {
    try {
      console.log(data);
      const response = await AddUserApi(data);
      if (response.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const response = await RolesApi(token);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.roles);
      setRoles(jsonData.body.roles);
    };
    getTasks();
  }, []);

  return (
    <div className="overflow-x-auto">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="mt-5">
              <TextField
                id="outlined-required fname"
                label="First Name"
                defaultValue=""
                size="small"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 my-3">{errors.firstName.message}</p>
              )}
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                id="outlined-required mname"
                label="Middle Name"
                defaultValue=""
                size="small"
                {...register("middleName")}
              />
              {errors.middleName && (
                <p className="text-red-500 my-3">{errors.middleName.message}</p>
              )}
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                id="outlined-required lname"
                label="Last Name"
                defaultValue=""
                size="small"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 my-3">{errors.lastName.message}</p>
              )}
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                id="outlined-required email"
                label="Email"
                defaultValue=""
                size="small"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 my-3">{errors.email.message}</p>
              )}
            </FormGroup>
            <FormGroup className="mt-5">
              <TextField
                id="outlined-required password"
                label="Password"
                type="password"
                defaultValue=""
                size="small"
                sx={{ mb: 2 }}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 my-3">{errors.password.message}</p>
              )}
            </FormGroup>

            <FormGroup>
              {roles &&
                roles.map((role) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox id={role.id} />}
                      label={role.name}
                    />
                  );
                })}
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
