import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import CustomNoRowsOverlay from "../../../../components/CustomNoRowsOverlay";
import { getAllRequestsUrl } from "../../../../services/urls";
import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { GetRequest } from "../../../../services/GetRequest";
export function ApproveMerchantsTable() {
  const [merchantRequests, setMerchantRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useAuth().getToken();

  const getAllRequests = async () => {
    setLoading(true);
    try {
      const response = await GetRequest(getAllRequestsUrl, token);
      const jsonData = await response.json();
      if (response.ok) {
        setMerchantRequests(jsonData);
        console.log("merchantRequests", jsonData);
      } else {
        console.error("Error fetching requests:", jsonData);
      }
    } catch (ex) {
      console.log("Failed to Fetch", ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 400,
      editable: true,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      width: 200,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
      editable: true,
    },
    {
      field: "businessName",
      headerName: "Business Name",
      width: 200,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Button
            onClick={() => navigate(`/approval-detail/${params.row.authId}`)}
          >
            Detail
          </Button>,
        ];
      },
    },
  ];

  return (
    <Box>
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
        onClick={getAllRequests}
      >
        Refresh <Refresh />
      </Button>

      <DataGrid
        autoHeight
        rows={merchantRequests}
        columns={columns}
        loading={loading}
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
