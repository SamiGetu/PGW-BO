/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
// import { FaSave } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import useAuth from "../../../../Hooks/useAuth";
import { Button } from "@mui/material";
import { GrRefresh } from "react-icons/gr";
import { FaList } from "react-icons/fa6";
import CustomNoRowsOverlay from "../../../../components/CustomNoRowsOverlay";

const row = [
  {
    id: "KPM0001",
    merchantId: 1,
    businessName: "Innvictus Software Development",
    payable: 2000,
  },
];
export const SettlementTableBo = () => {
  //   const [loading, setLoading] = useState(false);
  //   const [department, setDepartment] = useState([]);
  //   const token = useAuth().getToken();
  const navigate = useNavigate();

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
      field: "merchantId",
      headerName: "Merchant Id",
      width: 350,
      editable: true,
    },
    {
      field: "businessName",
      headerName: "Business Name",
      width: 350,
      editable: true,
    },
    {
      field: "payable",
      headerName: "Payable",
      width: 350,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: () => {
        return [
          <>
            <GridActionsCellItem
              icon={<FaList />}
              label="Detail"
              title="Detail"
              onClick={() => navigate("/settlement-detail")}
            />
          </>,
        ];
      },
    },
  ];
  return (
    <>
      <div className="container mx-auto">
        <div>
          <div className="flex justify-between my-1"></div>

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
          </Box>
        </div>
      </div>
    </>
  );
};
