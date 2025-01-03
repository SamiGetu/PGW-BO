import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const WithdrawalsPaymentDetail = () => {
  const [openApprove, setOpenApprove] = useState(false);

  const navigate = useNavigate();

  const handleApproveClickOpen = () => {
    setOpenApprove(true);
  };

  const handleApproveClose = () => {
    setOpenApprove(false);
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-extrabold mb-6">Withdrawal Payment</h1>
      <ul className="list-none space-y-3 md:space-y-5">
        <li className="text-md">
          <span className="font-medium mr-3">Merchant Name:</span>
          <span>Invictus Software Development PLC</span> (Owner)
        </li>
        <hr className="my-2 md:my-3" />
        <li className="text-md">
          <span className="font-medium mr-3">Bank Account:</span>
          <span>Bank of Abyssinia</span> / <span>CBE</span>
        </li>
        <hr className="my-2 md:my-3" />
        <li className="text-md">
          <span className="font-medium mr-3">Amount Requested:</span>
          <span>200,000.00</span>
        </li>
        <hr className="my-2 md:my-3" />
        <li className="text-md">
          <span className="font-medium mr-3">Amount Approved:</span>
          <span>200,000.00</span>
        </li>
      </ul>

      <Box sx={{ maxWidth: "800px", mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Accounts"
              defaultValue=""
              variant="outlined"
            >
              <MenuItem value="11548582588">11548582588</MenuItem>
              <MenuItem value="100012345678">100012345678</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Paid Through"
              defaultValue=""
              variant="outlined"
            >
              <MenuItem value="Check">Check</MenuItem>
              <MenuItem value="Mobile">Mobile</MenuItem>
              <MenuItem value="Internet">Internet</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Ref No" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>

      <div className="flex gap-5">
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
          onClick={handleApproveClickOpen}
        >
          Pay
        </Button>
        <Button
          variant="outlined"
          sx={{
            my: 2,
            fontWeight: "500",
          }}
          onClick={() => navigate("/withdraw-payment")}
        >
          Cancel
        </Button>
      </div>

      {/* Approve confirmation modal */}
      <Dialog
        open={openApprove}
        onClose={handleApproveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2>Are you Sure you Want to Make a Payment</h2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproveClose}>No</Button>
          <Button onClick={handleApproveClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
