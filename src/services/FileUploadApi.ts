export async function FileUploadApi(
  url: string,
  file: File,
  token?: string | null
): Promise<Response> {
  console.log(`Data to send for file upload: ${file.name}`);

  const formData = new FormData();
  formData.append("file", file);

  const myHeaders = new Headers();
  myHeaders.append("Mode", "cors");

  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  return response;
}
