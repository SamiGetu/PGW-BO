import {
  GetRolesURL,
  AddRoleUrl,
  DeleteRoleUrl,
  AddTaskToRoleUrl,
} from "../../../services/urls";

export async function RolesApi(token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(GetRolesURL, requestOptions);

  return response;
}
export async function AddRoleApi(
  token: string | null,
  name: string,
  description: string,
  tasks: string[]
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ name, description, tasks }),
  };

  const response = await fetch(AddRoleUrl, requestOptions);

  return response;
}

export async function AddTaskToRoleApi(
  token: string | null,
  id: string,
  tasks: string[]
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ tasks }),
  };

  const response = await fetch(
    `${AddTaskToRoleUrl}/${id}/add_tasks`,
    requestOptions
  );

  return response;
}

export async function UpdateRoleApi(
  token: string | null,
  roleId: number,
  name: string,
  description: string,
  tasks: string[]
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ name, description, tasks }),
  };

  const response = await fetch(`${DeleteRoleUrl}/${roleId}`, requestOptions);

  return response;
}

export async function DeleteRoleApi(token: string | null, roleId: number) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${DeleteRoleUrl}/${roleId}`, requestOptions);

  return response;
}
