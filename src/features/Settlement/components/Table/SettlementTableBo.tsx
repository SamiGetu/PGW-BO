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
    merchantName: "Merchant Name",
    unsettledAmount: 1000,
    allocatedAmount: 1000,
    settledAt: "20-10-2024",
  },
];
export const SettlementTableBo = () => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "merchantName",
      headerName: "Merchant Name",
      width: 250,
      editable: true,
    },
    {
      field: "unsettledAmount",
      headerName: "Unsettled Amount",
      width: 250,
      editable: true,
    },
    {
      field: "allocatedAmount",
      headerName: "Allocated Amount",
      width: 250,
      editable: true,
    },
    {
      field: "settledAt",
      headerName: "Settled At",
      width: 250,
      editable: true,
      renderCell: () => (
        <>
          <select name="" id="" className="w-20 bg-transparent">
            <option value="">Bank</option>
          </select>
        </>
      ),
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
              onClick={() => navigate("/settlement-detail")}
            />
          </>,
        ];
      },
    },
  ];
  return (
    <>
      <div className="container mx-auto">
        <div className="max-w-xl grid grid-cols-2 my-1">
          <Typography
            style={{
              fontFamily: "Barlow Condensed, serif",
              fontSize: "20px",
            }}
          >
            <span className="font-bold">Settlement ID:</span> 0001
          </Typography>
          <Typography
            style={{
              fontFamily: "Barlow Condensed, serif",
              fontSize: "20px",
            }}
          >
            <span className="font-bold">Bank name:</span> CBE{" "}
          </Typography>
          <Typography
            style={{
              fontFamily: "Barlow Condensed, serif",
              fontSize: "20px",
            }}
          >
            <span className="font-bold">Balance:</span> 1000{" "}
          </Typography>
        </div>

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
      </div>
    </>
  );
};
