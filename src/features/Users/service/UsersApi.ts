import { GetUsersURL } from "../../../services/urls";

export async function getUsersApi(token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(GetUsersURL, requestOptions);

  return response;
}

export async function AddUserApi(token: string | null, name: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ name }),
  };

  const response = await fetch(GetUsersURL, requestOptions);

  return response;
}

export async function DeleteUserApi(token: string | null, userId: number) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${GetUsersURL}/${userId}`, requestOptions);

  return response;
}

export async function UpdateUserApi(
  token: string | null,
  userId: string,
  firstName: string,
  lastName: string,
  email: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ firstName, lastName, email }),
  };

  const response = await fetch(`${GetUsersURL}/${userId}`, requestOptions);

  return response;
}
