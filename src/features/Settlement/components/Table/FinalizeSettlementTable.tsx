/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
// import { FaSave } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import useAuth from "../../../../Hooks/useAuth";
import { Button, Typography } from "@mui/material";
import { GrRefresh } from "react-icons/gr";
import { FaList } from "react-icons/fa6";
import CustomNoRowsOverlay from "../../../../components/CustomNoRowsOverlay";

const row: GridRowsProp = [
  {
    id: "1",
    settlementID: "Settlement ID",
    amount: 1000,
    bank: "Bank",
    reference: "Reference",
    status: "Status",
    date: "20-10-2024",
    uploadFile: "Upload File",
  },
];

export const FinalizeSettlementTable = () => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "settlementID",
      headerName: "Settlement ID",
      width: 200,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      editable: true,
    },
    {
      field: "bank",
      headerName: "Bank",
      width: 200,
      editable: true,
    },
    {
      field: "reference",
      headerName: "Reference",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "uploadFile",
      headerName: "Upload File",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: () => {
        return [
          <>
            <GridActionsCellItem
              icon={<FaList />}
              label="Detail"
              title="Detail"
              onClick={() => navigate("/finalize-settlements-detail")}
            />
          </>,
        ];
      },
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          my: 2,
          fontWeight: "bold",
        }}
      >
        <GrRefresh size={20} />
        Refresh
      </Button>
      <DataGrid
        rows={row}
        columns={columns}
        editMode="row"
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: GridToolbar,
        }}
        sx={{
          "--DataGrid-overlayHeight": "300px",
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "gray",
            fontSize: "10px",
          },
        }}
      />
    </Box>
  );
};
