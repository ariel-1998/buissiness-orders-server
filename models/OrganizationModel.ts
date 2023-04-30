import { z } from "zod";

export interface OrganizationModel {
    id: number;
    orgName: string;
    orgPassword: string;
    orgLogo?: string;
}

export const orgSchema = z.object({
    id: z.number().optional(),
    
    orgName: z.string()
        .min(2, "Name must contain at lest 2 letters")
        .max(30, "Name can't contain more than 30 letters"),

    orgPassword: z.string()
        .min(8, "Password must contain at lest 8 letters")
        .max(10, "Password can't contain more than 10 letters"),
})