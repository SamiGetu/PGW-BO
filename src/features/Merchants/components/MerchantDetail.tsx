import person from "../../../assets/images/elizeu-dias-2EGNqazbAMk-unsplash.jpg";
import MerchantDetailTable from "./MerchantDetailTable";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiFileDownloadFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SingleMerchantApi } from "../service/MerchentApi";
import useAuth from "../../../Hooks/useAuth";

type Merchant = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  businessName: string;
  email: string;
  phoneNumber: string;
};
export const MerchantDetail = () => {
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [merchant, setMerchant] = useState<Merchant>({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const merchantId = useParams().merchantId;
  const { getToken } = useAuth();
  const userToken = getToken();
  console.log(merchantId);

  const handleApproveClickOpen = () => {
    setOpenApprove(true);
  };
  const handleRejectClickOpen = () => {
    setOpenReject(true);
  };

  const handleApproveClose = () => {
    setOpenApprove(false);
  };
  const handleRejectClose = () => {
    setOpenReject(false);
  };

  const handleOnPDFButtonClick = () => {
    const data = {};
    navigate("/merchant-pdf", { state: data });
  };

  const getMerchant = async () => {
    try {
      if (merchantId) {
        const response = await SingleMerchantApi(merchantId, userToken);
        const jsonData = await response.json();
        console.log("jsonData", jsonData.body);
        setMerchant(jsonData.body);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMerchant();
  }, []);

  return (
    <>
      <div className="p-20 mt-10">
        <h1 className="text-4xl font-bold mb-10">Merchant Detail</h1>
        <div className="flex justify-between px-10 py-5">
          <div className="flex gap-5">
            <button
              className=" px-8 py-2 bg-primary text-white font-bold rounded-md"
              onClick={() => navigate("/merchants")}
            >
              <span className="flex items-center gap-2">
                <HiOutlineArrowNarrowLeft />
                back
              </span>
            </button>
            <button
              className="px-8 py-2 bg-primary text-white font-bold rounded-md"
              onClick={handleApproveClickOpen}
            >
              <span className="flex items-center gap-2">
                <FaCheck />
                Approve
              </span>
            </button>
            <button
              className="px-8 py-2 bg-primary text-white font-bold rounded-md"
              onClick={handleRejectClickOpen}
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
        <div className="flex justify-between gap-[10rem] rounded-xl shadow-lg">
          <div className="p-10">
            <ul className="list-none space-y-5">
              <li className="text-md">
                <span className="font-medium mr-5"> Full Name:</span>
                <span>
                  {merchant.firstName} {merchant.middleName} {merchant.lastName}
                </span>{" "}
                (Owner)
              </li>
              <hr />
              <li className="text-md">
                <span className="font-medium mr-5"> Merchant Type:</span>
                <span>Company</span>
              </li>
              <hr />
              <li className="text-md">
                <span className="font-medium mr-5"> Business Name:</span>
                <span>{merchant.businessName}</span>
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
          <div className="p-10">
            <div className="p-2 bg-primary/70 rounded-2xl">
              <img
                src={person}
                alt=""
                className="w-[20rem] h-[20rem] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-medium mt-10">Merchant Bank Accounts</h1>
        <div className="mt-10 rounded-xl shadow-lg">
          <MerchantDetailTable />
        </div>
      </div>
      {/* Approve confirmation modal */}
      <>
        <Dialog
          open={openApprove}
          onClose={handleApproveClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Approving the merchant requires to review the KYC. Make sure you
              have made the full-KYC. Are you sure to approve?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleApproveClose}>No</Button>
            <Button onClick={handleApproveClose} autoFocus>
              <span onClick={handleOnPDFButtonClick}> Yes</span>
            </Button>
          </DialogActions>
        </Dialog>
      </>
      {/* Reject confirmation modal */}
      <>
        <Dialog
          open={openReject}
          onClose={handleRejectClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>Please Provide Reason for the Rejection</p>
              <input
                type="text"
                className="px-10 py-2 border"
                placeholder="Reason..."
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRejectClose}>No</Button>
            <Button onClick={handleRejectClose} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};
