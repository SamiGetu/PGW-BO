import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, styled } from "@mui/material";
import CustomNoRowsOverlay from "../../../../../components/CustomNoRowsOverlay";

function createData(
  date: string,
  customer: string,
  transactionAmount: string,
  transactionThrough: string,
  commission: string
) {
  return { date, customer, transactionAmount, transactionThrough, commission };
}
type Row = ReturnType<typeof createData>;

const rows: Row[] = [];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LiveTransaction() {
  return (
    <Box sx={{ width: "100%" }}>
      <h1 className="text-2xl font-extrabold my-3">Live Transactions</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Customer
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Transaction Amount
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Transaction Through
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Commission
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 400,
                    }}
                  >
                    <CustomNoRowsOverlay />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.date}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="center">{row.customer}</TableCell>
                  <TableCell align="center">{row.transactionAmount}</TableCell>
                  <TableCell align="center">{row.transactionThrough}</TableCell>
                  <TableCell align="center">{row.commission}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
