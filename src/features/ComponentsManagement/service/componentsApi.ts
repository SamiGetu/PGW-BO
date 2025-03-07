import { GetComponentsURL } from "../../../services/urls";

export async function ComponentsApi(token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(GetComponentsURL, requestOptions);

  return response;
}
