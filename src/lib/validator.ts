import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid Email Address",}),
  password: z.string().min(1, { message: "Password is required" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const AddRoleSchema = z.object({
  name: z.string().min(3, { message: "Name is required and should be at least 3 characters" }),
  description: z.string().min(3, { message: "Description is required and should be at least 3 characters" }),
  tasks: z.array(z.string()),
})

export type TAddRoleSchema = z.infer<typeof AddRoleSchema>;

export const AddTaskSchema = z.object({
  TaskName: z.string().min(3, { message: "Name is required and should be at least 3 characters" }),
  target: z.string().min(3, { message: "Target is required and should be at least 3 characters" }),
})

export type TAddTaskSchema = z.infer<typeof AddTaskSchema>;
