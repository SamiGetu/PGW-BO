import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { GetRequest } from "../../../services/GetRequest";
import {
  ApproveMerchantForProductionUrl,
  GetSingleMerchantUrl,
} from "../../../services/urls";
import useAuth from "../../../Hooks/useAuth";
type AlertSeverity = "error" | "info" | "success" | "warning";

interface Snack {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

type Business = {
  businessName: string;
  businessType: {
    displayName: string;
    value: string;
  };
  businessTin: string;
  tineCertificateId: string;
  businessRegistrationNo: string;
  businessLicenseNo: string;
  tradeLicenseId: string;
  businessCity: string;
  businessSubCity: string;
  businessWoreda: string;
  businessHouseBldgNo: string;
  businessWebsite: string;
  businessTelephone: string;
  businessIndustry: string;
  businessTransactionVolumeMonthly: string;
};
type Merchant = {
  merchantGender: string;
  merchantDateOfBirth: string;
  merchantAddressCity: string;
  merchantAddressSubCity: string;
  merchantAddressWoreda: string;
  merchantAddressHouseNo: string;
  merchantIdType: {
    displayName: string;
    value: string;
  };
  identificationDocumentId: string;
};
const ApprovalDetail = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const navigate = useNavigate();
  const authId = useParams().authId;
  const requestId = useParams().requestId;
  const token = useAuth().getToken();
  const [snack, setSnack] = useState<Snack>({
    open: false,
    message: "",
    severity: "info",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleSnackOpen = (message: string, severity: AlertSeverity) => {
    setSnack({ open: true, message, severity });
  };

  const handleSnackClose = (_event: unknown, reason: string) => {
    if (reason !== "clickaway") {
      setSnack((prev) => ({ ...prev, open: false }));
    }
  };

  const getMerchant = async () => {
    try {
      const response = await GetRequest(
        `${GetSingleMerchantUrl}/${authId}`,
        token
      );
      const jsonData = await response.json();
      if (response.ok) {
        console.log("merchant Detail", jsonData);
        setBusiness(jsonData.body.kyc.businessDetails);
        setMerchant(jsonData.body.kyc.merchantDetails);
      } else {
        console.log("failed to Fetch", jsonData);
      }
    } catch (ex) {
      console.log("failed to Fetch", ex);
    }
  };
  useEffect(() => {
    getMerchant();
  }, []);

  const approveRequest = async () => {
    try {
      const response = await GetRequest(
        `${ApproveMerchantForProductionUrl}/${requestId}`,
        token
      );
      const jsonData = await response.json();
      if (response.ok) {
        console.log("approval request", jsonData);
        handleSnackOpen(jsonData.message, "success");
        navigate("/approve-merchants");
      } else {
        handleSnackOpen(jsonData.message, "error");
        console.log("failed to Fetch", jsonData);
      }
    } catch (ex) {
      console.log("failed to Fetch", ex);
    }finally{
      setOpenDialog(false);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "Barlow Condensed, serif" }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={(event) => handleSnackClose(event, "")}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      {/* Business Information */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <IoIosArrowRoundBack
            size={30}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          Business Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <p>
            <span className="font-medium text-gray-600">Industry:</span>{" "}
            {business?.businessIndustry ? business.businessIndustry + " " : ""}
          </p>
          <p>
            <span className="font-medium text-gray-600">Business Name:</span>{" "}
            {business?.businessName ? business.businessName + " " : ""}
          </p>
          <p>
            <span className="font-medium text-gray-600">Business Type:</span>{" "}
            {business?.businessType?.value
              ? business.businessType.value + " "
              : ""}
          </p>
          <p>
            <span className="font-medium text-gray-600">TIN:</span>{" "}
            {business?.businessTin ? business.businessTin + " " : ""}
          </p>
          <p>
            <span className="font-medium text-gray-600">Registration No:</span>{" "}
            {business?.businessRegistrationNo
              ? business.businessRegistrationNo + " "
              : ""}
          </p>
          <p>
            <span className="font-medium text-gray-600">License No:</span>{" "}
            {business?.businessLicenseNo
              ? business.businessLicenseNo + " "
              : ""}
          </p>
          <p className="col-span-2">
            <span className="font-medium text-gray-600">Business Address:</span>{" "}
            {`${business?.businessCity ? business.businessCity + ", " : ""}${
              business?.businessSubCity ? business.businessSubCity + ", " : ""
            }${business?.businessWoreda ? business.businessWoreda + ", " : ""}${
              business?.businessHouseBldgNo ? business.businessHouseBldgNo : ""
            }`}
          </p>
          <p>
            <span className="font-medium text-gray-600">Website:</span>{" "}
            {business?.businessWebsite ? business.businessWebsite + " " : ""}
          </p>
          <p>
            <span className="font-medium text-gray-600">Telephone:</span>{" "}
            {business?.businessTelephone
              ? business.businessTelephone + " "
              : ""}
          </p>
          <p className="col-span-2">
            <span className="font-medium text-gray-600">
              Transaction Volume:
            </span>{" "}
            {business?.businessTransactionVolumeMonthly
              ? business.businessTransactionVolumeMonthly + " "
              : ""}
          </p>
        </div>
      </div>

      {/* Merchant Information */}
      <div className="my-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Merchant Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-lg">
          <p>
            <span className="font-medium text-gray-600">Gender:</span>{" "}
            {merchant?.merchantGender}
          </p>
          <p>
            <span className="font-medium text-gray-600">Date of Birth:</span>{" "}
            {merchant?.merchantDateOfBirth}
          </p>
          <p className="col-span-2">
            <span className="font-medium text-gray-600">Merchant Address:</span>{" "}
            {`${merchant?.merchantAddressCity}, ${merchant?.merchantAddressSubCity}, ${merchant?.merchantAddressWoreda}, ${merchant?.merchantAddressHouseNo}`}
          </p>
          <p>
            <span className="font-medium text-gray-600">ID Type:</span>{" "}
            {merchant?.merchantIdType?.value}
          </p>
          <p>
            <span className="font-medium text-gray-600">
              Identification Document:
            </span>{" "}
            {merchant?.identificationDocumentId}
          </p>
        </div>
      </div>
      {/* Action Buttons */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to approve this merchant?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please make sure that you have reviewed all the necessary
            information before approving the merchant.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={approveRequest} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex justify-end mb-6 space-x-4">
        <Button variant="outlined" color="primary">
          Reject
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDialogOpen}
        >
          Approve
        </Button>
      </div>
    </div>
  );
};

export default ApprovalDetail;
