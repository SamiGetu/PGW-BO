import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiFileDownloadFill } from "react-icons/ri";

const WithdrawDetail = () => {
  return (
    <>
      <div className="p-20">
        <div className="flex justify-between  py-5">
          <div className="flex gap-5">
            <button className=" px-8 py-2 bg-primary text-white font-bold rounded-md">
              <span className="flex items-center gap-2">
                <HiOutlineArrowNarrowLeft />
                Verfiy
              </span>
            </button>
            <button
              className="px-8 py-2 bg-primary text-white font-bold rounded-md"
              // onClick={handleApproveClickOpen}
            >
              <span className="flex items-center gap-2">
                <FaCheck />
                Approve
              </span>
            </button>
            <button
              className="px-8 py-2 bg-primary text-white font-bold rounded-md"
              // onClick={handleRejectClickOpen}
            >
              <span className="flex items-center gap-2">
                <FaXmark />
                Reject
              </span>
            </button>
          </div>
          <div className="px-8 py-2 bg-primary text-white font-bold rounded-md">
            <span className="flex items-center gap-2">
              <RiFileDownloadFill />
              Download
            </span>
          </div>
        </div>
        {/*  */}

        <div className="pt-10">
          <ul className="list-none space-y-5">
            <li className="text-md">
              <span className="font-medium mr-5"> Full Name:</span>
              <span>Abebe Kebede</span> (Owner)
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5"> Merchant Type:</span>
              <span>Company</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5"> Business Name:</span>
              <span>Invictus Software Development PLC</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5"> Tin Number:</span>
              <span>123456</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5"> Licence Reg.No:</span>
              <span>12345</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5"> Principal Reg.No:</span>
              <span>54321</span>
            </li>
            <hr />
            <li className="text-md">
              <span className="font-medium mr-5">
                Primary Bank Accoutn Name
              </span>
              <span>Invictus Software Development PLC</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WithdrawDetail;
