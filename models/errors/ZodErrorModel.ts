
interface ZodIssuesModel {
    issues: {message: string}[]
}

export class ZodErrorModel {
    private message: string[]
    constructor(e: ZodIssuesModel) {
        this.message = e.issues.map(e => e.message)
    }
}