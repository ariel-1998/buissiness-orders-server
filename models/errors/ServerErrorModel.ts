import { ErrorModel } from "./ErrorModel"

export class ServerErrorModel extends ErrorModel {
    constructor() {
        super();
        this.code = 500
        this.message = "Somthing went wrong"
    }
}