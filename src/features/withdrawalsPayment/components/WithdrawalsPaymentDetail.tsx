import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
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
    <>
      <div className="p-24">
        <div>
          <h1 className="text-4xl font-bold mb-10">Withdrawal Payment</h1>
          <ul className="list-none space-y-5">
            <li className="text-md">
              <span className="font-medium mr-5">Merchant Name:</span>
              <span>Invictus Software Devlopment PLC</span> (Owner)
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5">Bank Account:</span>
              <span>Bank of Abyssinya</span>/ <span>CBE</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5"> Amount Requested</span>
              <span>200,000.00</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5">Amount Approved</span>
              <span>200,000.00</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-5  p-5 rounded-lg font-medium mt-[5rem]">
          <hr />
          <div className="flex items-center gap-3 ">
            <label htmlFor="" className="text-md font-medium">
              Accounts:
            </label>
            <select name="" id="" className="px-5 py-[5px]  rounded-md">
              <option value="">11548582588</option>
              <option value="">100012345678</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="">Paid Through:</label>
            <select name="" id="" className="px-5 py-[5px]rounded-md">
              <option value="">Check</option>
              <option value="">Mobile</option>
              <option value="">Internet</option>
              <option value="">Bank</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="">Ref No:</label>
            <input
              type="text"
              className="px-10 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="">Amount:</label>
            <input
              type="text"
              className="px-10 py-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Pick a Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className="flex gap-10 mt-10">
          <button
            className="px-10 py-2 rounded-md bg-primary text-white font-bold"
            onClick={handleApproveClickOpen}
          >
            pay
          </button>
          <button
            className="px-10 py-2 rounded-md border border-secondary bg-white  font-bold"
            onClick={() => navigate("/withdraw-payment")}
          >
            Cancel
          </button>
        </div>
        <div>
          {" "}
          {/* Approve confirmation modal */}
          <>
            <Dialog
              open={openApprove}
              onClose={handleApproveClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <h2>Are you Sure you Want to Make a Payment</h2>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleApproveClose}>No</Button>
                <Button onClick={handleApproveClose} autoFocus>
                  yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        </div>
      </div>
    </>
  );
};
