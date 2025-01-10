import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { GrRefresh } from "react-icons/gr";
import CustomNoRowsOverlay from "../../../../components/CustomNoRowsOverlay";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

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

export const FinalizeSettlementDetailTable = () => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "merchantName",
      headerName: "Merchant Name",
      width: 400,
      editable: true,
    },
    {
      field: "unsettledAmount",
      headerName: "Unsettled Amount",
      width: 400,
      editable: true,
    },
    {
      field: "settledAmount",
      headerName: "Settled Amount",
      width: 300,
      editable: true,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 300,
      editable: true,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <IoArrowBack
        onClick={() => navigate(-1)}
        size={20}
        className="cursor-pointer"
      />
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
