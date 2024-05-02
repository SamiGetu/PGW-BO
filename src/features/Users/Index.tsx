import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Refresh } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CustomNoRowsOverlay from "./components/CustomNoRowsOverlay";

export default function Index() {
  const columns: any = [];
  const rows: any = [];
  return (
    <div className="h-[100%] px-16">
      <div className="">
        <Typography variant="h4" sx={{ fontWeight: "bold", my: 4 }}>
          Users Management
        </Typography>
        <div className="flex">
          <ButtonGroup
            variant="contained"
            aria-label="outlined secondary button group"
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#F58634",
                ":hover": { bgcolor: "#3E4095" },
                borderRight: "1px solid white",
              }}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#F58634", ":hover": { bgcolor: "#3E4095" } }}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Box sx={{ height: 400, py: 2, alignItems: "center" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // loading={loading}
          editMode="row"
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridToolbar }}
          sx={{ "--DataGrid-overlayHeight": "300px", width: "940px" }}
        />
      </Box>
    </div>
  );
}
