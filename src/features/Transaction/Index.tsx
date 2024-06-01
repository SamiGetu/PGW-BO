import { TrancationTable } from "./components/TrancationTable";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

export const Index = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  return (
    <div className="p-20">
      <h1 className="text-4xl font-bold mb-5">Daily Transactions</h1>
      <div className="flex justify-between items-center mr-[10rem] mb-10">
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
        <div className="font-medium text-xl  border-b-[1px] border-primary rounded-xl p-5">
          <div className="flex items-center gap-4 ">
            <label htmlFor="">Total Number of Merchants:</label>
            <p>98</p>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="">Total Transcation Amount:</label>
            <p>ETB 222,850,000.00</p>
          </div>
        </div>
      </div>
      <TrancationTable />
    </div>
  );
};
