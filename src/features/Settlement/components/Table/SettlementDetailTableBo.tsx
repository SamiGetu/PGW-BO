/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
// import { FaSave } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import useAuth from "../../../../Hooks/useAuth";
import { Button, TextField, Typography } from "@mui/material";
import { GrRefresh } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import CustomNoRowsOverlay from "../../../../components/CustomNoRowsOverlay";

const row = [
  {
    id: "1",
    date: "20-10-2024",
    amount: 1500,
    status: "Partially Settled",
    settled: 1100,
    unSettled: 400,
  },
  {
    id: "2",
    date: "20-12-2024",
    amount: 1600,
    status: "Pending",
    settled: 0,
    unSettled: 1600,
  },
];
export const SettlementDetailTableBo = () => {
  //   const [loading, setLoading] = useState(false);
  //   const [department, setDepartment] = useState([]);
  //   const token = useAuth().getToken();
  const navigate = useNavigate();

  function formatMoney(amount: number, currency = "ETB", locale = "en-US") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  const current = new Date();

  //   const fetchDepartment = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await GetRequest(getAllDepartmentUrl, token);
  //       const jsonData = await response.json();
  //       if (response.ok) {
  //         console.log("Department", jsonData.body);
  //         setDepartment(jsonData.body);
  //         setLoading(false);
  //       } else {
  //         console.log("jsonData", jsonData);
  //         setLoading(false);
  //       }
  //     } catch (ex) {
  //       console.log("error fetching department", ex);
  //       setLoading(false);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchDepartment();
  //   }, []);
  //   const handleStatusColorChange = (status: string) => {
  //     if (status === "pending") {
  //       return "red";
  //     } else if (status === "partiallySettled") {
  //       return "#FF9900";
  //     } else if (status === "fullySettled") {
  //       return "green";
  //     }
  //   };

  const columns: GridColDef<(typeof row)[number]>[] = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      editable: true,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => <Box>{formatMoney(params.value)}</Box>,
    },
    {
      field: "settled",
      headerName: "Settled",
      width: 200,
      editable: true,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => <Box>{formatMoney(params.value)}</Box>,
    },
    {
      field: "unSettled",
      headerName: "Unsettled",
      width: 200,
      editable: true,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => <Box>{formatMoney(params.value)}</Box>,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: true,
    },
  ];
  return (
    <>
      <div
        className="container mx-auto"
        style={{ fontFamily: "Barlow Condensed, serif" }}
      >
        <div>
          <IoArrowBack
            onClick={() => navigate(-1)}
            size={20}
            className="cursor-pointer"
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-start", gap: 10 }}
            >
              <Typography
                style={{
                  fontFamily: "Barlow Condensed, serif",
                  fontSize: "20px",
                }}
              >
                <span className="font-bold">Merchant ID:</span> KPM0001
              </Typography>
              <Typography
                style={{
                  fontFamily: "Barlow Condensed, serif",
                  fontSize: "20px",
                }}
              >
                <span className="font-bold">Bank:</span> CBE{" "}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-start", gap: 10 }}
            >
              <Typography
                style={{
                  fontFamily: "Barlow Condensed, serif",
                  fontSize: "20px",
                }}
              >
                <span className="font-bold">Business Name:</span> Innvictus
                Software Development
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "25px",
                  fontFamily: "Barlow Condensed, serif",
                }}
              >
                Payable: 2000
              </Typography>
            </Box>
          </Box>

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
            <Typography
              sx={{
                my: 2,
                fontFamily: "Barlow Condensed, serif",
              }}
            >
              Daily Transactions Summary
            </Typography>
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
          <form action="">
            <fieldset className="border p-5 rounded-md">
              <legend className="text-lg">Settlement Form</legend>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <TextField
                    label="Date"
                    margin="normal"
                    variant="outlined"
                    defaultValue={current.toISOString().split("T")[0]}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="date"
                  />
                  <TextField
                    label="Amount to Settle"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Bank Ref"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Attach Receipt"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="file"
                  />
                </Box>
                <Button variant="contained" size="large" color="secondary">
                  Settle
                </Button>
              </Box>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};
