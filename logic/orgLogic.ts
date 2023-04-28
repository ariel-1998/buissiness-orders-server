import { OkPacket } from "mysql2";
import { execute } from "../dataLayer/sqlConfig";
import { OrganizationModel } from "../models/OrganizationModel";

export async function getOrg(org: OrganizationModel): Promise<OrganizationModel> {
    const { orgName, orgPassword} = org;
    const query = "SELECT * FROM organizations WHERE orgName = ? AND orgPassword = ?";
    const [res] = await execute<OrganizationModel[]>(query, [orgName, orgPassword]);
    return res[0];
}
export async function createOrg(org: OrganizationModel) {
    const { orgName, orgPassword} = org;
    const query = "INSERT INTO organizations (orgName, orgPassword) VALUES(?, ?)";
    const [res] = await execute<OkPacket>(query, [orgName, orgPassword]);
    return res.affectedRows;
}