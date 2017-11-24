
export default class AuthorizeError {
    constructor(response) {
        this.response = response;
    }
}

AuthorizeError.status = 401;
