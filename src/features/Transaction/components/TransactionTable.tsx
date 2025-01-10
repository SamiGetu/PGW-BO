import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import { Refresh } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";

export function TransactionTable() {
  const navigate = useNavigate();

  const handleViewClick = (id: GridRowId) => () => {
    console.log("CLicked" + id);

    navigate("/transaction-detail");
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "merchant",
      headerName: "Merchant",
      width: 400,
      editable: true,
    },
    {
      field: "dailyTotal",
      headerName: "Daily Total",
      width: 200,
      editable: true,
    },
    {
      field: "settledAmount",
      headerName: "Setteld Amount",
      width: 200,
      editable: true,
    },
    {
      field: "settledOn",
      headerName: "Settled On",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <div
          style={{
            color: params.value === "UNSETTLED" ? "red" : "green",
            fontWeight: "500",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [<Button onClick={handleViewClick(id)}>Detail</Button>];
      },
    },
  ];

  const rows = [
    {
      id: 1,
      merchant: "Invictus Software Development PLC (ID5546857)",
      dailyTotal: "2,456,321.90",
      settledAmount: "-",
      settledOn: "-",
      status: "UNSETTLED",
    },
    {
      id: 2,
      merchant: "Shoa Shopping Center (ID5478589)",
      dailyTotal: "3,567,567.90",
      settledAmount: "-",
      settledOn: "-",
      status: "UNSETTLED",
    },
    {
      id: 3,
      merchant: "Lannister Fast Delivery (ID4575637)",
      dailyTotal: "4,542,567.90",
      settledAmount: "4,542,567.90",
      settledOn: "June 1, 2024",
      status: "SETTLED",
    },
  ];

  return (
    <Box>
      <div className="font-medium text-lg sm:text-md rounded-xl w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <label htmlFor="">Total Merchants:</label>
          <p className="font-extrabold">98</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3">
          <label htmlFor="">Total Transactions Amount:</label>
          <p className="font-extrabold">ETB 222,850,000.00</p>
        </div>
      </div>

      <Button
        variant="contained"
        color="secondary"
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
      <div className="flex justify-start gap-5 items-center my-5">
        <TextField
          label="Pick a Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Status" size="small" select className="w-[10rem]">
          <MenuItem>All</MenuItem>
          <MenuItem>Live</MenuItem>
          <MenuItem>Archive</MenuItem>
        </TextField>
      </div>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
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
        disableRowSelectionOnClick
      />
    </Box>
  );
}
