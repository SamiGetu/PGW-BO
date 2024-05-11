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
import { AddRoleModal } from "./components/AddTaskModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

export default function Index() {
  const [tasks, setTasks] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSnackClose = () => {
    setOpenSnack(false);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setTasks(tasks.filter((task) => task.id !== id));
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

    const editedRow = tasks.find((task) => task.id === id);
    if (editedRow!.isNew) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setTasks(tasks.map((task) => (task.id === newRow.id ? updatedRow : task)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "taskName", headerName: "Task Name", width: 150, editable: true },
    {
      field: "urlPattern",
      headerName: "URL Pattern",
      width: 150,
      editable: true,
    },
    { field: "component", headerName: "Component", width: 150, editable: true },
    { field: "parent", headerName: "Parent", width: 150, editable: true },
    {
      field: "listOrder",
      headerName: "List Order",
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
  const tasksData = [
    {
      id: 1,
      taskName: "Users",
      urlPattern: "/users",
      component: "UsersPage",
      parent: "Admin",
      listOrder: "1",
    },
    {
      id: 2,
      taskName: "Roles",
      urlPattern: "/roles",
      component: "RolesPage",
      parent: "Admin",
      listOrder: "2",
    },
    {
      id: 3,
      taskName: "Tasks",
      urlPattern: "/tasks",
      component: "TasksPage",
      parent: "Admin",
      listOrder: "3",
    },
    {
      id: 4,
      taskName: "Settings",
      urlPattern: "/settings",
      component: "SettingsPage",
      parent: "Admin",
      listOrder: "4",
    },
    {
      id: 5,
      taskName: "Dashboard",
      urlPattern: "/dashboard",
      component: "DashboardPage",
      parent: "Admin",
      listOrder: "5",
    },
    {
      id: 6,
      taskName: "Reports",
      urlPattern: "/reports",
      component: "ReportsPage",
      parent: "Admin",
      listOrder: "6",
    },
    {
      id: 7,
      taskName: "Admin",
      urlPattern: "/admin",
      component: "AdminPage",
      parent: "Admin",
      listOrder: "7",
    },
  ];
  useEffect(() => setTasks(tasksData));
  return (
    <div className="h-full w-[90%] mx-auto z-50" style={{ minHeight: "100vh" }}>
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
          <h2>Task Management</h2>
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
          rows={tasks}
          columns={columns}
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
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </div>
    </div>
  );
}
