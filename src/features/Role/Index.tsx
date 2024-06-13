import { Refresh } from "@mui/icons-material";
import {
  Alert,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import { AddRoleModal } from "./components/AddRoleModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { DeleteRoleApi, RolesApi, UpdateRoleApi } from "./service/RolesApi";
import useAuth from "../../Hooks/useAuth";
import { AddTaskModal } from "./components/AddTaskModal";

export default function Index() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [roles, setRoles] = useState<GridRowsProp>([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<GridRowId | null>(null); // State for selected role ID
  const { getToken } = useAuth();
  const token = getToken();

  const handleClickOpen = (id: GridRowId) => {
    setOpen(true);
    setSelectedRoleId(id); // Set the selected role ID
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setOpenSnack(false);
  };
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    return id;
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    handelEditRole(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = roles.find((role) => role.id === id);
    if (editedRow!.isNew) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRoles(roles.map((role) => (role.id === newRow.id ? updatedRow : role)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Role Name", width: 150, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 350,
      editable: true,
    },
    {
      field: "isBuiltIn",
      headerName: "is Built-in",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const currentRecord = roles.find((role) => role.id === id);
        console.log();

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            disabled={currentRecord?.isBuiltIn === "Yes"}
            onClick={() => handleClickOpen(id)}
            color="inherit"
          />,
          <AddTaskModal key={id} existingId={id.toString()} />,
        ];
      },
    },
  ];

  const handelEditRole = async (roleId: any) => {
    try {
      const response = await UpdateRoleApi(token, roleId, "test", "test", []);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSuccess(true);
        setOpenSnack(true);
        setSnackMessage("Role updated successfully");
      } else {
        console.log("Request failed with status " + response.status);
        setSuccess(false);
        setOpenSnack(true);
        setSnackMessage("Failed to update the role.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteSubmit = async (roleId: any) => {
    try {
      const response = await DeleteRoleApi(token, roleId);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setRoles(roles.filter((role) => role.id !== roleId)); // Remove the role from the state
        setSuccess(true);
        setOpenSnack(true);
        setSnackMessage("Role deleted successfully");
      } else {
        console.log("Request failed with status " + response.status);
        setSuccess(false);
        setOpenSnack(true);
        setSnackMessage("Failed to delete the role.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRoles = async () => {
    try {
      setLoading(true);
      const response = await RolesApi(token);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.roles);
      setRoles(jsonData.body.roles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <div className="px-5 sm:px-10 md:px-20 mt-10">
      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this role?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              handleDeleteSubmit(selectedRoleId);
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      <div className="py-4">
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 4 }}>
          <h2>Roles Management</h2>
        </Typography>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Button Group */}
          <ButtonGroup
            variant="contained"
            aria-label="outlined secondary button group"
            sx={{ mb: { xs: 2, sm: 0 }, mr: { xs: 0, sm: 2 } }}
          >
            <Button
              key="refreshRoles"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
              }}
              onClick={() => getRoles()}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
            <AddRoleModal key="fetchRoles" />
          </ButtonGroup>
        </div>
      </div>

      {/* DataGrid */}
      <div className="py-4" style={{ minWidth: 0 }}>
        <DataGrid
          rows={roles}
          columns={columns}
          loading={loading}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          columnVisibilityModel={{ id: false }}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridToolbar }}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </div>
    </div>
  );
}
