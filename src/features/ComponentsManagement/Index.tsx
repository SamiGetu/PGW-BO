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
import { AddComponentModal } from "./components/AddComponentModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { ComponentsApi } from "./service/componentsApi";
import useAuth from "../../Hooks/useAuth";

export default function Index() {
  const [tasks, setTasks] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

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
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "urlPattern",
      headerName: "URL Pattern",
      width: 150,
      editable: true,
    },
    { field: "component", headerName: "Component", width: 150, editable: true },
    {
      field: "listOrder",
      headerName: "List Order",
      width: 150,
      editable: true,
    },
    {
      field: "hasSpace",
      headerName: "Has Space",
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
  const token = getToken();
  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await ComponentsApi(token);
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
  return (
    <div
      className="h-full z-50"
      style={{ fontFamily: "Barlow Condensed, serif" }}
    >
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
        <h2 className="text-3xl font-bold mb-2">Components Management</h2>
        <div className="flex">
          <ButtonGroup aria-label="outlined secondary button group">
            <Button
              key="refreshRoles"
              variant="contained"
              sx={{
                color: "white",
                fontWeight: "500",
                background: "#3E4095",
                "&:hover": {
                  background: "#3E4095",
                },
              }}
              onClick={() => getTasks()}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
            <AddComponentModal key="fetchRoles" />
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
          sx={{
            "--DataGrid-overlayHeight": "300px",
            color: "black",
            ".MuiButtonBase-root": {
              color: "#3E4095",
            },
          }}
        />
      </div>
    </div>
  );
}
