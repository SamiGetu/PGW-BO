import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId, GridToolbar } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Refresh } from "@mui/icons-material";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="100%"
        height="100%"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        {/* SVG content */}
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

export function WithdrawalsPaymentTable() {
  const navigate = useNavigate();

  const handleViewClick = (id: GridRowId) => () => {
    console.log("Clicked " + id);
    navigate("/withdraw-payment-detail");
  };

  const columns: GridColDef[] = [
    {
      field: "merchant",
      headerName: "Merchant",
      width: 300, // Adjust width as needed or use dynamic sizing
      editable: true,
    },
    {
      field: "dateRequested",
      headerName: "Date Requested",
      width: 160,
      editable: true,
    },
    {
      field: "amountRequested",
      headerName: "Amount Requested",
      width: 160,
      editable: true,
    },
    {
      field: "primaryBank",
      headerName: "Primary Bank",
      width: 250,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => (
        <div
          style={{
            color: params.value === "APPROVED" ? "green" : "blue",
            fontWeight: "500",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "approvedAmount",
      headerName: "Approved Amount",
      width: 160,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button onClick={handleViewClick(params.id as GridRowId)}>
          Detail
        </Button>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      merchant: "Invictus Software Development PLC (ID5546857)",
      dateRequested: "June 1, 2024",
      amountRequested: "100,000.00",
      primaryBank: "Bank of Abyssinia",
      status: "APPROVED",
      approvedAmount: "100,000.00",
    },
    {
      id: 2,
      merchant: "Shoa Shopping Center (ID5478589)",
      dateRequested: "June 02, 2024",
      amountRequested: "200,000.00",
      primaryBank: "Commercial Bank of Ethiopia",
      status: "PENDING",
      approvedAmount: "0",
    },
  ];

  return (
    <Box>
      <h1 className="text-3xl font-bold mb-2">Withdrawal Requests</h1>
      <Box>
        <Button
          variant="contained"
          sx={{
            my: 2,
            color: "white",
            fontWeight: "500",
            background: "#3E4095",
            "&:hover": {
              background: "#3E4095",
            },
          }}
        >
          Refresh <Refresh />
        </Button>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          sx={{
            "--DataGrid-overlayHeight": "300px",
            ".MuiButtonBase-root": {
              color: "#3E4095",
            },
          }}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
