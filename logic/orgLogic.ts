import { OkPacket } from "mysql2";
import { execute } from "../utils/sqlConfig";
import { OrganizationModel } from "../models/OrganizationModel";

export const IMG_TYPE = ".png";

//check if needed
export async function getOrg(org: OrganizationModel): Promise<OrganizationModel> {
    const { orgName, orgPassword } = org;
    const query = "SELECT * FROM organizations WHERE orgName = ? AND orgPassword = ?";
    const [res] = await execute<OrganizationModel[]>(query, [orgName, orgPassword]);
    return res[0];
}

export async function createOrg(org: OrganizationModel): Promise<OrganizationModel> {
    const { orgName, orgPassword } = org;
    const query = "INSERT INTO organizations (orgName, orgPassword) VALUES(?, ?)";
    const [res] = await execute<OkPacket>(query, [orgName, orgPassword]);
    const id = res.insertId
    await addImgToOrg(id)
    return {
        orgName,
        orgPassword,
        id,
        orgLogo: id + IMG_TYPE
    }
}

//check what returns and if works
export async function updateOrg(org: OrganizationModel) {
    const { orgName, orgPassword, id } = org;
    const query = `UPDATE organizations 
    SET orgName = ?, orgPassword = ?
    WHERE id = ?`;
    const [res] = await execute<OkPacket>(query, [orgName, orgPassword, id]);
    return res
}

//check if works and what returns
export async function deleteOrg(id: number) {
    const query = `DELETE FROM organizations WHERE id = ?`;
    const [res] = await execute<OkPacket>(query, [id]);
    return res;
}

export async function addImgToOrg(orgId: number) {
    const query = `UPDATE organizations SET orgLogo = ?`;
    const [res] = await execute<OkPacket>(query, [orgId + IMG_TYPE]);
    return res;
}