"use strict";

let URL_SEGMENTS_PROP = Symbol("urlSegments");
let HTTP_METHODS_PROP = Symbol("httpMetods");

class UrlBuilder {

    constructor(init, httpImpl) {

        function getUrl() {
            return this[URL_SEGMENTS_PROP].join("/");
        }

        this[URL_SEGMENTS_PROP] = init != null ? [init] : [];
        this[HTTP_METHODS_PROP] = {
            get: (body, queryParams, headers)=> {
                return this[HTTP_METHODS_PROP].http(getUrl.call(this), 'GET', body, queryParams, headers);
            },

            http: httpImpl
        };
    }

    withUrlSegment(x) {
        let result = new UrlBuilder(null, this[HTTP_METHODS_PROP].http);
        result[URL_SEGMENTS_PROP] = this[URL_SEGMENTS_PROP].slice(0);
        result[URL_SEGMENTS_PROP].push(x);

        if (this[HTTP_METHODS_PROP].hasOwnProperty(x)) {
            let handler = function (...args) {
                return this[HTTP_METHODS_PROP][x](...args);
            };
            Object.setPrototypeOf(handler, result);
            return handler;
        }

        return result;
    }
}
