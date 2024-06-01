import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(bank: string, accountnumber: string, type: string) {
  return { bank, accountnumber, type };
}

const rows = [
  createData("Bank of Abyssinia", "1235633220008", "PRIMARY"),
  createData("Commercial Bank of Ethiopia", "1000045654311", "SECONDARY"),
  createData("Berhan Bank", "111230987345", "SECONDARY"),
];

export default function MerchantDetailTable() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bank</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.bank}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.bank}
              </TableCell>
              <TableCell>{row.accountnumber}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
