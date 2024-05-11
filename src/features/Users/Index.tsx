import { useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";
import {
  Alert,
  Button,
  ButtonGroup,
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

export default function Index() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [users, setUsers] = useState<GridRowsProp>([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setUsers(users.filter((user) => user.id !== id));
    setOpenSnack(true);
    setSnackMessage("Role deleted successfully");
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
    setOpenSnack(true);
    setSnackMessage("Role updated successfully");
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setUsers(users.map((user) => (user.id === newRow.id ? updatedRow : user)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    {
      field: "FirstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "LastName", headerName: "Last Name", width: 150, editable: true },
    { field: "Email", headerName: "Email", width: 150, editable: true },
    { field: "status", headerName: "Status", width: 150, editable: true },
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const usersData = [
    {
      id: 1,
      FirstName: "John",
      LastName: "Doe",
      Email: "jdoe@me.com",
      status: "Active",
    },
    {
      id: 2,
      FirstName: "Jane",
      LastName: "Doe",
      Email: "jdoe@me.com",
      status: "Active",
    },
    {
      id: 3,
      FirstName: "Joe",
      LastName: "Doe",
      Email: "jdoe@me.com",
      status: "Active",
    },
    {
      id: 4,
      FirstName: "Jill",
      LastName: "Doe",
      Email: "jdoe@me.com",
      status: "Active",
    },
    {
      id: 5,
      FirstName: "Jack",
      LastName: "Doe",
      Email: "jdoe@me.com",
      status: "Active",
    },
    {
      id: 6,
      FirstName: "Jill",
      LastName: "Doe",
      Email: "jdoe@me.com",
      status: "Active",
    },
  ];
  useEffect(() => setUsers(usersData));
  return (
    <div className="h-[100%] w-[90%] mx-auto" style={{ minHeight: "100vh" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
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
              //   onClick={() => fetchRoles()}
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
          //   loading={loading}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
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
