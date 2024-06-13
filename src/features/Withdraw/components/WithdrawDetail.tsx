import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiFileDownloadFill } from "react-icons/ri";

const WithdrawDetail = () => {
  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-between py-5 space-y-4 md:space-y-0 md:space-x-4">
        <button className="w-full md:w-auto px-8 py-2 bg-primary text-white font-bold rounded-md md:flex items-center gap-2">
          <HiOutlineArrowNarrowLeft />
          <span className="hidden md:inline-block">Verify</span>
        </button>
        <button className="w-full md:w-auto px-8 py-2 bg-primary text-white font-bold rounded-md md:flex items-center gap-2">
          <FaCheck />
          <span className="hidden md:inline-block">Approve</span>
        </button>
        <button className="w-full md:w-auto px-8 py-2 bg-primary text-white font-bold rounded-md md:flex items-center gap-2">
          <FaXmark />
          <span className="hidden md:inline-block">Reject</span>
        </button>
        <div className="w-full md:w-auto px-8 py-2 bg-primary text-white font-bold rounded-md md:flex items-center gap-2">
          <RiFileDownloadFill />
          <span className="hidden md:inline-block">Download</span>
        </div>
      </div>

      <div className="pt-10">
        <ul className="list-none space-y-5">
          <li className="text-md">
            <span className="font-medium mr-5">Full Name:</span>
            <span>Abebe Kebede</span> (Owner)
          </li>
          <hr className="md:hidden" />
          <li className="text-md">
            <span className="font-medium mr-5">Merchant Type:</span>
            <span>Company</span>
          </li>
          <hr className="md:hidden" />
          <li className="text-md">
            <span className="font-medium mr-5">Business Name:</span>
            <span>Invictus Software Development PLC</span>
          </li>
          <hr className="md:hidden" />
          <li className="text-md">
            <span className="font-medium mr-5">Tin Number:</span>
            <span>123456</span>
          </li>
          <hr className="md:hidden" />
          <li className="text-md">
            <span className="font-medium mr-5">Licence Reg. No:</span>
            <span>12345</span>
          </li>
          <hr className="md:hidden" />
          <li className="text-md">
            <span className="font-medium mr-5">Principal Reg. No:</span>
            <span>54321</span>
          </li>
          <hr className="md:hidden" />
          <li className="text-md">
            <span className="font-medium mr-5">Primary Bank Account Name:</span>
            <span>Invictus Software Development PLC</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WithdrawDetail;
