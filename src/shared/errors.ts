import HttpStatusCodes from 'http-status-codes';

export abstract class HTTPError extends Error {
    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}
