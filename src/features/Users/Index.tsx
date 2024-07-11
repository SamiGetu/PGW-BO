import { useEffect, useState } from "react";
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
import { AddRoleModal } from "./components/AddUserModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DeleteUserApi, UpdateUserApi, getUsersApi } from "./service/UsersApi";
import useAuth from "../../Hooks/useAuth";

export default function Index() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [users, setUsers] = useState<GridRowsProp>([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<GridRowId | null>(null);
  const { getToken } = useAuth();

  const handleClickOpen = (id: GridRowId) => {
    setOpen(true);
    setSelectedRoleId(id);
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
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = users.find((user) => user.id === id);
    if (editedRow!.isNew) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };
  type editUserType = {
    id: string;
    isNew: boolean;
    firstName: string;
    lastName: string;
    email: string;
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false } as editUserType;
    setUsers(users.map((user) => (user.id === newRow.id ? updatedRow : user)));
    handelEdit(
      updatedRow.id,
      updatedRow.firstName,
      updatedRow.lastName,
      updatedRow.email
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150, editable: true },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    { field: "roles", headerName: "Roles", width: 150, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
            onClick={() => handleClickOpen(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const token = getToken();
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(token);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.users);
      setUsers(jsonData.body.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handelDelete = async (id: any) => {
    try {
      const response = await DeleteUserApi(token, id);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setOpenSnack(true);
        setSnackMessage("user deleted successfully");
        setSuccess(true);
        getUsers();
      } else {
        console.log("Request failed with status " + response.status);
        setOpenSnack(true);
        setSnackMessage("Failed to delete the user.");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handelEdit = async (
    id: string,
    firstName: string,
    lastName: string,
    email: string
  ) => {
    try {
      const response = await UpdateUserApi(
        token,
        id,
        firstName,
        lastName,
        email
      );
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setOpenSnack(true);
        setSnackMessage("user updated successfully");
        setSuccess(true);
        getUsers();
      } else {
        console.log("Request failed with status " + response.status);
        setOpenSnack(true);
        setSnackMessage("Failed to update the user.");
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setOpenSnack(true);
      setSnackMessage("Failed to update the user");
    }
  };

  return (
    <div className="h-[100%]" style={{ minHeight: "100vh" }}>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Task?"}
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
              handelDelete(selectedRoleId);
              handleClose();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div className="py-4">
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 4 }}>
          <h2>User Management</h2>
        </Typography>
        <div className="flex">
          <ButtonGroup
            variant="contained"
            aria-label="outlined secondary button group"
          >
            <Button
              key="refreshRoles"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
              }}
              onClick={() => getUsers()}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
            <AddRoleModal key="fetchRoles" />
          </ButtonGroup>
        </div>
      </div>
      <div className="py-4">
        <DataGrid
          rows={users}
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
          sx={{ "--DataGrid-overlayHeight": "300px", color: "black" }}
        />
      </div>
    </div>
  );
}
