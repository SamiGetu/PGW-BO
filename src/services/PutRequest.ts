export async function PutRequest(
  url: string,
  body: object,
  token?: string | null
): Promise<Response> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify(body),
  };

  const response = await fetch(url, requestOptions);

  return response;
}
