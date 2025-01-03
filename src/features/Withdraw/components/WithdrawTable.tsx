import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Refresh } from "@mui/icons-material";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";

export function WithdrawTable() {
  const [openApprove, setOpenApprove] = useState(false);

  const handleApproveClickOpen = () => {
    setOpenApprove(true);
  };

  const handleApproveClose = () => {
    setOpenApprove(false);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "merchant",
      headerName: "Merchant",
      width: 350,
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
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
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
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: () => {
        return [<Button onClick={handleApproveClickOpen}>Approve</Button>];
      },
    },
  ];

  const rows = [
    {
      id: 1,
      merchant: "Invictus Software Development PLC (ID5546857)",
      dateRequested: "June 1,2024",
      amountRequested: "100,000.00",
      status: "APPROVED",
      approvedAmount: "100,000.00",
    },
    {
      id: 2,
      merchant: "Shoa Shopping Center (ID5478589)",
      dateRequested: "June 02,2024",
      amountRequested: "200,000.00",
      status: "PENDING",
      approvedAmount: "0",
    },
  ];

  return (
    <div>
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
      {/* Approve confirmation modal */}
      <Dialog
        open={openApprove}
        onClose={handleApproveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold" }} id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ my: 2 }} id="alert-dialog-description">
            <TextField label="Amount to be Paid" fullWidth />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproveClose} color="primary">
            No
          </Button>
          <Button onClick={handleApproveClose} autoFocus color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
