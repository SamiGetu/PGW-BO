const apiBaseURL = "https://api.kispay.et/api";

export const LoginURL = `${apiBaseURL}/auth/login`;
export const RegisterURL = `${apiBaseURL}/auth/register`;
export const GetUsersURL = `${apiBaseURL}/auth/users`;
export const GetRolesURL = `${apiBaseURL}/auth/roles`;
export const AddRoleUrl = `${apiBaseURL}/auth/roles`;
export const AddTaskToRoleUrl = `${apiBaseURL}/auth/roles`;
export const DeleteRoleUrl = `${apiBaseURL}/auth/users`;
export const GetComponentsURL = `${apiBaseURL}/auth/components`;
export const GetTasksURL = `${apiBaseURL}/auth/tasks`;
export const AddTaskUrl = `${apiBaseURL}/auth/tasks`;
export const DeleteTaskUrl = `${apiBaseURL}/auth/tasks`;
export const GetMerchantsURL = `${apiBaseURL}/merchants/get_all_merchants`;
export const GetSingleMerchantUrl = `${apiBaseURL}/merchants/get_merchant`;

export const getAllRolesUrl = `${apiBaseURL}/auth/roles`;
export const addRole = `${apiBaseURL}/auth/users/add_roles`;

export const getAllRequestsUrl = `${apiBaseURL}/merchants/rfp/get_all_requests`;
