import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbar,
} from "@mui/x-data-grid";
import { Refresh } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import CustomNoRowsOverlay from "../components/CustomNoRowsOverlay";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

export default function User() {
  const [rowModesModel, setRowModesModel] = useState({});
  // const [users, setUsers] = useState([]);
  
  const handleRowEditStop = (params: any, event: any) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  // const handleRowModesModelChange = (newRowModesModel) => {
  //   setRowModesModel(newRowModesModel);
  // };
  

  // const handleEditClick = (id: number) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  // const handleSaveClick = (id: number) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };

  // const handleDeleteClick = (id: number) => () => {
  //   setUsers(users.filter((user: any) => user.id !== id));
  //   // handleDeleteSubmit(id:Number);
  // };
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 100,
      editable: true,
    },
    {
      field: "middleName",
      headerName: "Middle name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: ["ACTIVE", "BLOCKED"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
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
              // onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              // onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            // onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            // onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          // <ManageUserRolesModal existingId={id} />,
        ];
      },
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", middleName: "A", age: 14 },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      middleName: "B",
      age: 31,
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      middleName: "C",
      age: 31,
    },
    { id: 4, lastName: "Stark", firstName: "Arya", middleName: "D", age: 11 },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      middleName: "E",
      age: null,
    },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  return (
    <div className="h-screen px-16">
      <div className="px-10">
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 4 }}>
          Users Management
        </Typography>
        <div className="flex">
          <ButtonGroup
            variant="contained"
            aria-label="outlined secondary button group"
          >
            <Button
              variant="contained"
              // onClick={() => fetchUsers()}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              // onClick={() => fetchUsers()}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
            {/* <AddUserModal afterSave={fetchUsers} /> */}
          </ButtonGroup>
        </div>
      </div>
      <Box sx={{ height: 400, py: 2, px: 5 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // loading={loading}
          editMode="row"
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          rowModesModel={rowModesModel}
          // onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          checkboxSelection
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridToolbar }}
          sx={{ "--DataGrid-overlayHeight": "300px", width: "1000px" }}
        />
      </Box>
    </div>
  );
}
