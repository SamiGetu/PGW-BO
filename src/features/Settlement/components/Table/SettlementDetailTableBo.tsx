/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { GrRefresh } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import CustomNoRowsOverlay from "../../../../components/CustomNoRowsOverlay";

const row: GridRowsProp = [];
export const SettlementDetailTableBo = () => {
  const navigate = useNavigate();

  const columns: GridColDef<(typeof row)[number]>[] = [
    {
      field: "merchantName",
      headerName: "Merchant Name",
      width: 200,
      editable: true,
    },
    {
      field: "accountNumber",
      headerName: "Account Number",
      width: 150,
      editable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      editable: true,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 200,
      editable: true,
      align: "right",
      headerAlign: "right",
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

          <h1 className="max-w-sm text-2xl font-bold">
            Kispay Financial solutions S.C Payment settlement Dashen Bank S.C
            Jan 4 2024
          </h1>
          <div className="max-w-3xl ">
            <p className="text-lg my-1">
              <span className="text-lg text-secondary font-bold">Dear</span>{" "}
              Samuel
            </p>
            <p className="text-lg">
              Please credit to the following list of your customer by debiting
              our account maintain with you 1184356789345 with their
              corresponding amount. Please note that, put 9842 as your remark.
              Regards
            </p>
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

            <div className="flex my-10 text-xl">
              <label htmlFor="">Signed</label>
              <div className="w-[20rem] border-b border-black"></div>
              <label className="mx-10">Stamp</label>
            </div>
          </Box>
          {/* <form action="">
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
          </form> */}
        </div>
      </div>
    </>
  );
};
