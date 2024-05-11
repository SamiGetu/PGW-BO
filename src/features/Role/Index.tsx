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
import { AddRoleModal } from "./components/AddRoleModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useState } from "react";

type RolesDataType = {
  id: number;
  roleName: string;
  isBuiltIn: "Yes" | "No";
};
const data: RolesDataType[] = [
  { id: 1, roleName: "Role_SA", isBuiltIn: "Yes" },
  { id: 2, roleName: "Role_Admin", isBuiltIn: "No" },
  {
    id: 3,
    roleName: "Role_Merchant",
    isBuiltIn: "No",
  },
  {
    id: 4,
    roleName: "ROLE_FINANCE_MANAGER",
    isBuiltIn: "No",
  },
];

export default function Index() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [roles, setRoles] = useState<GridRowsProp>(data);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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

  const handleDeleteClick = (id: GridRowId) => () => {
    setRoles(roles.filter((role) => role.id !== id));
    setOpenSnack(true);
    setSnackMessage("Role deleted successfully");
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
    { field: "roleName", headerName: "Role Name", width: 250, editable: true },
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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <div className="w-[90%] mx-auto h-[100%]">
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
          <h2>Roles Management</h2>
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
          rows={roles}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridToolbar }}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </div>
    </div>
  );
}
