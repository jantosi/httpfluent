"use strict";

/**
 * Created by Kuba on 18.12.2016.
 */
export class HttpRequestInvoker {
    constructor(httpImpl) {
        this.httpImpl = httpImpl;
    }

    get(body, queryParams, headers) {
        return (url) => this.httpImpl(url, 'GET', body, queryParams, headers);
    };

    post(body, queryParams, headers) {
        return (url) => this.httpImpl(url, 'POST', body, queryParams, headers);
    };

    head(body, queryParams, headers) {
        return (url) => this.httpImpl(url, 'HEAD', body, queryParams, headers);
    };

    put(body, queryParams, headers) {
        return (url) => this.httpImpl(url, 'PUT', body, queryParams, headers);
    };

    'delete'(body, queryParams, headers) {
        return (url) => this.httpImpl(url, 'DELETE', body, queryParams, headers);
    };

    patch(body, queryParams, headers) {
        return (url) => this.httpImpl(url, 'PATCH', body, queryParams, headers);
    }
}