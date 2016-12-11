"use strict";

import {UrlBuilder} from "./UrlBuilder";

export function ChainableUrl(init = "", httpImpl) {
    function wrapInProxy(o) {
        return new Proxy(o, {
            get: function (target, name) {
                if (name in o) {
                    // end proxy recursion when hit a property on object
                    return o[name];
                }

                return wrapInProxy(o.withUrlSegment(name));
            },
        });
    }

    function getStartingUrl(s) {
        return s.endsWith("/") ? s.substr(0, s.length - 1) : s;
    }

    return wrapInProxy(
        new UrlBuilder(getStartingUrl(init),
            httpImpl
        )
    );
}