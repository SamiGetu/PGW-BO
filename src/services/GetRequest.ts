export async function GetRequest(url: string, token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(url, requestOptions);

  return response;
}
