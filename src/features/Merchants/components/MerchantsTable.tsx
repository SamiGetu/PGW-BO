import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import { FaStreetView } from "react-icons/fa";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MerchantsApi } from "../service/MerchentApi";
import useAuth from "../../../Hooks/useAuth";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";

export function MerchantsTable() {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const userToken = getToken();

  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", width: 90 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
      flex: 1,
      minWidth: 120,
      editable: true,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      width: 150,
      flex: 1,
      minWidth: 120,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      flex: 1,
      minWidth: 120,
      editable: true,
    },
    {
      field: "businessType",
      headerName: "Business Type",
      width: 150,
      flex: 1,
      minWidth: 120,
      editable: true,
    },
    {
      field: "businessName",
      headerName: "Business Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: "mode",
      headerName: "Mode",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{
            color: params.value === "PRODUCTION" ? "green" : "#D69E2E",
            fontWeight: "500",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      flex: 1,
      minWidth: 120,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      flex: 0.8,
      minWidth: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <Button key="view" onClick={() => handleViewClick(id)}>
            <GridActionsCellItem
              icon={<FaStreetView />}
              label="View"
              className="textPrimary"
              color="inherit"
            />
            View
          </Button>,
        ];
      },
    },
  ];

  const getMerchants = async () => {
    try {
      setLoading(true);
      const response = await MerchantsApi(userToken);
      const jsonData = await response.json();
      console.log("jsonData", jsonData.body.merchants);
      setMerchants(jsonData.body.merchants);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getMerchants();
  }, []);

  const handleViewClick = (id: GridRowId) => {
    console.log("Clicked " + id);
    navigate(`/merchant-detail/${id}`);
  };

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={merchants}
        columns={columns}
        loading={loading}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{ "--DataGrid-overlayHeight": "300px" }}
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
  );
}
