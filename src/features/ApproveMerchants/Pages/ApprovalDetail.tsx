import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { GetRequest } from "../../../services/GetRequest";
import { GetSingleMerchantUrl } from "../../../services/urls";
import useAuth from "../../../Hooks/useAuth";
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
  merchantIdType: string;
  identificationDocumentId: string;
};
const ApprovalDetail = () => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [merchant, setMerchant] = useState<Merchant | null>(null);

  const navigate = useNavigate();
  const authId = useParams().authId;
  const token = useAuth().getToken();
  const getMerchant = async () => {
    try {
      const response = await GetRequest(
        `${GetSingleMerchantUrl}/${authId}`,
        token
      );
      const jsonData = await response.json();
      if (response.ok) {
        setBusiness(jsonData);
        setMerchant(jsonData);
        console.log("merchant Detail", jsonData);
      } else {
        console.log("failed to Fetch", response);
      }
    } catch (ex) {
      console.log("failed to Fetch", ex);
    }
  };
  useEffect(() => {
    getMerchant();
  });

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "Barlow Condensed, serif" }}
    >
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
            {business?.businessIndustry}
          </p>
          <p>
            <span className="font-medium text-gray-600">Business Name:</span>{" "}
            {business?.businessName}
          </p>
          <p>
            <span className="font-medium text-gray-600">Business Type:</span>{" "}
            {business?.businessType.value}
          </p>
          <p>
            <span className="font-medium text-gray-600">TIN:</span>{" "}
            {business?.businessTin}
          </p>
          <p>
            <span className="font-medium text-gray-600">Registration No:</span>{" "}
            {business?.businessRegistrationNo}
          </p>
          <p>
            <span className="font-medium text-gray-600">License No:</span>{" "}
            {business?.businessLicenseNo}
          </p>
          <p className="col-span-2">
            <span className="font-medium text-gray-600">Business Address:</span>{" "}
            {`${business?.businessCity}, ${business?.businessSubCity}, ${business?.businessWoreda}, ${business?.businessHouseBldgNo}`}
          </p>
          <p>
            <span className="font-medium text-gray-600">Website:</span>{" "}
            {business?.businessWebsite}
          </p>
          <p>
            <span className="font-medium text-gray-600">Telephone:</span>{" "}
            {business?.businessTelephone}
          </p>
          <p className="col-span-2">
            <span className="font-medium text-gray-600">
              Transaction Volume:
            </span>{" "}
            {business?.businessTransactionVolumeMonthly}
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
            {merchant?.merchantIdType}
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
      <div className="flex justify-end mb-6 space-x-4">
        <Button variant="outlined" color="primary">
          Reject
        </Button>
        <Button variant="contained" color="secondary">
          Approve
        </Button>
      </div>
    </div>
  );
};

export default ApprovalDetail;
