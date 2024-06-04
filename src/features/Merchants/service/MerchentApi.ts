import { GetMerchantsURL, GetSingleMerchantUrl } from "../../../services/urls";

export async function MerchantsApi(token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(GetMerchantsURL, requestOptions);

  return response;
}

export async function SingleMerchantApi(merchantId: string, token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(`${GetSingleMerchantUrl}/${merchantId}`, requestOptions);

  return response;
}
