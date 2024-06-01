import { MerchantsTable } from "./components/MerchantsTable";

export const Index = () => {
  return (
    <>
      <div className="p-20">
        <h1 className="text-3xl font-medium mb-10">Merchants</h1>
        <MerchantsTable />
      </div>
    </>
  );
};
