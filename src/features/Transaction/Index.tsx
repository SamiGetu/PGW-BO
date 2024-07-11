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
    <div className="mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
        Daily Transactions
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="w-full md:w-auto mb-5 md:mb-0">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Pick a Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                className="w-full"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="font-medium text-lg sm:text-xl border-b-[1px] border-primary rounded-xl p-5 w-full md:w-auto md:ml-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label htmlFor="">Total Merchants:</label>
            <p>98</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3">
            <label htmlFor="">Total Transcation Amount:</label>
            <p>ETB 222,850,000.00</p>
          </div>
        </div>
      </div>
      <TrancationTable />
    </div>
  );
};
