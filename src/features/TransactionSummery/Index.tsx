import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SummeryTable } from "../TransactionSummary/components/SummaryTable";

export const Index = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
          Transaction Summary
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="w-full md:w-auto mb-5 md:mb-0 space-y-10">
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
        </div>
        <SummeryTable />
      </div>
    </>
  );
};
