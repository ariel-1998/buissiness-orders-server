import { z } from "zod";

enum EmployeeRole {
    Admin = 1,
    Manager = 2,
    Employee = 3
}

export interface EmployeeModel {
    id: number;
    firstName: string;
    lastName: string;
    orgId: number;
    role: EmployeeRole;
    username: string;
    password: string;
}

export const employeeSchema = z.object({
    id: z.number().optional(),
    orgId: z.number(),

    firstName: z.string()
        .min(2, "First name must contain at lest 2 letters")
        .max(30, "First name can't contain more than 15 letters"),

        lastName: z.string()
        .min(2, "Last name must contain at lest 2 letters")
        .max(30, "Last name can't contain more than 15 letters"),

        username: z.string()
        .min(6, "Username must contain 6-10 chars")
        .max(10, "Username must contain 6-10 chars"),

        password: z.string()
        .min(8, "Password must contain 8-10 chars")
        .max(10, "Password must contain 8-10 chars"),

        role: z.nativeEnum(EmployeeRole)
})