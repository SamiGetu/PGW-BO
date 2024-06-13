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
import { AddRoleModal } from "./components/AddTaskModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { DeleteTaskApi, TasksApi, UpdateTaskApi } from "./service/TasksApi";
import useAuth from "../../Hooks/useAuth";

export default function Index() {
  const [tasks, setTasks] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
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

    const editedRow = tasks.find((task) => task.id === id);
    if (editedRow!.isNew) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setTasks(tasks.map((task) => (task.id === newRow.id ? updatedRow : task)));
    handleEdit(newRow.id, newRow.taskName, newRow.target);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "target",
      headerName: "Target",
      width: 250,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      width: 250,
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
  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await TasksApi(token);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.tasks);
      setTasks(jsonData.body.tasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const handleEdit = async (id: any, taskName: string, target: string) => {
    try {
      const response = await UpdateTaskApi(token, id, taskName, target);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setOpenSnack(true);
        setSnackMessage("Task updated successfully");
        setSuccess(true);
        getTasks();
      } else {
        console.log("Request failed with status " + response.status);
        setOpenSnack(true);
        setSnackMessage("Failed to update the task.");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async (id: any) => {
    try {
      const response = await DeleteTaskApi(token, id);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setOpenSnack(true);
        setSnackMessage("Task deleted successfully");
        setSuccess(true);
        getTasks();
      } else {
        console.log("Request failed with status " + response.status);
        setOpenSnack(true);
        setSnackMessage("Failed to delete the task.");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="px-5 sm:px-10 md:px-20 z-50" style={{ minHeight: "100vh" }}>
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
              handleDelete(selectedRoleId);
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
              onClick={() => getTasks()}
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
