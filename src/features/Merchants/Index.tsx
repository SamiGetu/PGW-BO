import { MerchantsTable } from "./components/MerchantsTable";

export const Index = () => {
  return (
    <>
      <div className="mt-10">
        <h1 className="text-3xl font-bold  mb-10">Merchants</h1>
        <MerchantsTable />
      </div>
    </>
  );
};
