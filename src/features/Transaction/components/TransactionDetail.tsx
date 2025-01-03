import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowId, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IoIosArrowRoundBack } from "react-icons/io";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import { Refresh } from "@mui/icons-material";

export function TransactionDetail() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const navigate = useNavigate();

  const handleViewClick = (id: GridRowId) => () => {
    console.log("Clicked " + id);
    navigate("/customer-detail");
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "customer",
      headerName: "Customer",
      width: 350,
      editable: true,
    },
    {
      field: "transactionType",
      headerName: "Transaction Type",
      width: 160,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 160,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.status === "TEST" ? "TEST" : "PRODUCTION"}`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [<Button onClick={handleViewClick(id)}>View</Button>];
      },
    },
  ];

  const rows = [
    {
      id: 1,
      customer: "+251913478855",
      transactionType: "TeleBirr",
      amount: "2,000,000",
      time: "05:01:39",
      status: "SUCCESSFUL",
    },
    {
      id: 2,
      customer: "423178459399345",
      transactionType: "Card",
      amount: "12,980",
      time: "04:12:34",
      status: "SUCCESSFUL",
    },
  ];

  return (
    <div>
      <div className="space-y-2 my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2">
          <IoIosArrowRoundBack
            size={30}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />{" "}
          Customer Daily Transaction
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 text-lg sm:text-xl font-medium">
            <label>Total Transaction</label>
            <p className="font-extrabold">2,456,321.90</p>
          </div>
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
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
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
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
