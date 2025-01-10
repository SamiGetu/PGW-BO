export async function PostRequest(
  url: RequestInfo | URL,
  body: object,
  token: string | null
): Promise<Response> {
  const data = JSON.stringify(body);
  console.log("data to send", data);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }
  myHeaders.append("Mode", "cors");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);

  return response;
}
