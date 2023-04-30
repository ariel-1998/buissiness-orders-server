import { EmployeeModel } from "../models/EmployeeModel";
import { execute } from "../utils/sqlConfig";

export async function getEmployee(username: string) {
    const query = `SELECT * FROM employees WHERE username = ?`
    const [res] = await execute(query, [username]);
    return res[0];
}

export const createEmployee = async (employee: EmployeeModel) => {
    const { firstName, lastName, orgId, role, username, password } = employee;

    const query = `INSERT INTO employees 
(firstName, lastName, orgId, role, username, password) 
VALUES(?, ?, ?, ?, ?, ?)`;

    const [res] = await execute(query, [
        firstName,
        lastName,
        orgId,
        role,
        username,
        password
    ]);

    return res;
}

