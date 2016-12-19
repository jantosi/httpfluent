"use strict";

import {HttpRequestInvoker} from "./HttpRequestInvoker";


let URL_SEGMENTS_PROP = Symbol("urlSegments");
let HTTP_METHODS_PROP = Symbol("httpMethods");

export class UrlBuilder {

    constructor(init, httpImpl) {
        this.httpImpl = httpImpl;
        this[HTTP_METHODS_PROP] = new HttpRequestInvoker(httpImpl);
        this[URL_SEGMENTS_PROP] = init != null ? [init] : [];
    }

    getUrl() {
        return this[URL_SEGMENTS_PROP].join("/");
    }

    withUrlSegment(x) {
        let result = new UrlBuilder(null, this.httpImpl);
        result[URL_SEGMENTS_PROP] = this[URL_SEGMENTS_PROP].slice(0);
        result[URL_SEGMENTS_PROP].push(x);

        if (x in this[HTTP_METHODS_PROP]) {
            let handler = function (...args) {
                return this[HTTP_METHODS_PROP][x](...args)(this.getUrl());
            };
            Object.setPrototypeOf(handler, result);
            return handler;
        }

        return result;
    }
}
