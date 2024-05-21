import { GetTasksURL, AddTaskUrl, DeleteTaskUrl } from "../../../services/urls";

export async function TasksApi(token: string | null) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(GetTasksURL, requestOptions);

  return response;
}

export async function AddTaskApi(
  token: string | null,
  TaskName: string,
  target: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ TaskName, target }),
  };

  const response = await fetch(AddTaskUrl, requestOptions);

  return response;
}

export async function DeleteTaskApi(token: string | null, taskId: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${DeleteTaskUrl}/${taskId}`, requestOptions);

  return response;
}

export async function UpdateTaskApi(
  token: string | null,
  taskId: string,
  TaskName: string,
  target: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Mode", "cors");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
    body: JSON.stringify({ TaskName, target }),
  };

  const response = await fetch(`${DeleteTaskUrl}/${taskId}`, requestOptions);

  return response;
}
