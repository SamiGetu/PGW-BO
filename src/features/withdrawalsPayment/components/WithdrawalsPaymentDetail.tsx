import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const WithdrawalsPaymentDetail = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const [openApprove, setOpenApprove] = useState(false);

  const navigate = useNavigate();

  const handleApproveClickOpen = () => {
    setOpenApprove(true);
  };

  const handleApproveClose = () => {
    setOpenApprove(false);
  };

  return (
    <div className="p-4 md:p-10 lg:p-10 xl:p-20">
      <h1 className="text-4xl font-bold mb-6">Withdrawal Payment</h1>
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

      <div className="flex flex-col gap-3 md:gap-5 p-3 md:p-5 rounded-lg mt-8">
        <hr className="my-2 md:my-3" />
        <div className="flex items-center gap-3">
          <label className="text-md font-medium" htmlFor="accounts">
            Accounts:
          </label>
          <select
            id="accounts"
            className="px-3 py-1 md:px-5 md:py-2 rounded-md"
          >
            <option value="">11548582588</option>
            <option value="">100012345678</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-md" htmlFor="paidThrough">
            Paid Through:
          </label>
          <select
            id="paidThrough"
            className="px-3 py-1 md:px-5 md:py-2 rounded-md"
          >
            <option value="">Check</option>
            <option value="">Mobile</option>
            <option value="">Internet</option>
            <option value="">Bank</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-md" htmlFor="refNo">
            Ref No:
          </label>
          <input
            id="refNo"
            type="text"
            className="px-3 py-1 md:px-5 md:py-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-md" htmlFor="amount">
            Amount:
          </label>
          <input
            id="amount"
            type="text"
            className="px-3 py-1 md:px-5 md:py-2 border border-gray-400 rounded-md"
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pick a Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="flex gap-5 mt-8">
        <button
          className="px-5 py-2 md:px-10 md:py-2 rounded-md bg-primary text-white font-bold"
          onClick={handleApproveClickOpen}
        >
          Pay
        </button>
        <button
          className="px-5 py-2 md:px-10 md:py-2 rounded-md border border-secondary bg-white font-bold"
          onClick={() => navigate("/withdraw-payment")}
        >
          Cancel
        </button>
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
