import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useAuth from "../../../Hooks/useAuth";
import { Add } from "@mui/icons-material";
import { GetRequest } from "../../../services/GetRequest";
import { addRole, getAllRolesUrl } from "../../../services/urls";
import { PostRequest } from "../../../services/PostRequest";

type AlertSeverity = "error" | "info" | "success" | "warning";

interface Snack {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

interface Role {
  id: string;
  name: string;
}

interface ManageUserRoleProps {
  existingId: string;
  afterSave: () => void;
}

const ManageUserRole: React.FC<ManageUserRoleProps> = ({
  existingId,
  afterSave,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [snack, setSnack] = useState<Snack>({
    open: false,
    message: "",
    severity: "info",
  });

  const token = useAuth().getToken();
  const userId = existingId;

  const toggleCheckboxValue = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelectedRoles((prev) =>
      event.target.checked
        ? [...prev, id]
        : prev.filter((roleId) => roleId !== id)
    );
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  const handleSnackOpen = (message: string, severity: AlertSeverity) => {
    setSnack({ open: true, message, severity });
  };

  const handleSnackClose = (_: unknown, reason: string) => {
    if (reason !== "clickaway") {
      setSnack((prev) => ({ ...prev, open: false }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      roles: selectedRoles,
    };

    console.log("Payload:", payload);

    try {
      const response = await PostRequest(
        `${addRole}/${userId}`,
        payload,
        token
      );
      if (response.ok) {
        handleSnackOpen("User roles updated successfully.", "success");
        handleClose();
        afterSave();
      } else {
        const jsonData = await response.json();
        handleSnackOpen("User role update was not successful.", "error");
        console.error("Error:", jsonData);
      }
    } catch (error) {
      handleSnackOpen("User role update was not successful.", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await GetRequest(getAllRolesUrl, token);
      const jsonData = await response.json();
      if (response.ok) {
        setRoles(jsonData.body.roles);
        console.log("Roles fetched successfully:", jsonData.body);
      } else {
        console.error("Error fetching roles:", jsonData);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  //   const getUserRoles = async () => {
  //     try {
  //       const response = await GetRequest(`${getAllRolesUrl}/${userId}`, token);
  //       const jsonData = await response.json();
  //       if (response.ok) {
  //         setSelectedRoles(jsonData.roles.map((role: Role) => role.id));
  //       } else {
  //         console.error("Failed to fetch user roles:", jsonData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user roles:", error);
  //     }
  //   };

  const openRolesModalFromButton = () => {
    handleShow();
    fetchRoles();
  };

  return (
    <>
      <GridActionsCellItem
        icon={<ChecklistIcon />}
        label="Choices"
        className="textPrimary"
        onClick={openRolesModalFromButton}
        color="inherit"
      />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={(event) => handleSnackClose(event, "")}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="modal-title">
            Maintain User Roles
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Please select the roles suitable for the selected user.
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup sx={{ maxHeight: 290, overflowY: "auto", mt: 2 }}>
              {roles.map((role) => (
                <FormControlLabel
                  key={role.id}
                  control={
                    <Checkbox
                      checked={selectedRoles.includes(role.id)}
                      onChange={(event) => toggleCheckboxValue(event, role.id)}
                      disabled={[
                        "ROLE_STUDENT",
                        "ROLE_APPLICANT",
                        "ROLE_SA",
                        "ROLE_INSTRUCTOR",
                      ].includes(role.name)}
                    />
                  }
                  label={role.name}
                />
              ))}
            </FormGroup>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
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
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ManageUserRole;
