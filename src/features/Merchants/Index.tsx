import { MerchantsTable } from "./components/MerchantsTable";

export const Index = () => {
  return (
    <>
      <div className="px-5 sm:px-10 md:px-20 mt-10">
        <h1 className="text-3xl font-bold font-medium mb-10">Merchants</h1>
        <MerchantsTable />
      </div>
    </>
  );
};
