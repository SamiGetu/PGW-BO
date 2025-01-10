import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
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
  width: 800,
  bgcolor: "background.paper",
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
    <div style={{ fontFamily: "Barlow Condensed, serif" }}>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<Add />}
        sx={{
          color: "white",
          fontWeight: "500",
          background: "#3E4095",
          "&:hover": {
            background: "#3E4095",
          },
        }}
      >
        Add Role
      </Button>

      <Snackbar autoHideDuration={6000} message="Role Created Successfully." />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ fontFamily: "Barlow Condensed, serif" }}
          >
            Add New User
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  {...register("middleName")}
                  error={!!errors.middleName}
                  helperText={errors.middleName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  Assign Roles
                </Typography>
                <div className="flex flex-wrap items-center gap-5">
                  {roles.map((role) => (
                    <FormControlLabel
                      key={role.id}
                      control={<Checkbox id={role.id} />}
                      label={role.name}
                    />
                  ))}
                </div>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  fontWeight: "500",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
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
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
