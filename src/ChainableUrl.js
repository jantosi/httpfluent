"use strict";

function ChainableUrl(init = "", httpImpl) {
    function wrapInProxy(o) {
        return new Proxy(o, {
            get: function (target, name) {
                if (name in o) {
                    return o[name];
                }
                let wrapped = wrapInProxy(o.withUrlSegment(name));
                return wrapped;
            },
        });
    }

    let startingUrl = init.endsWith("/") ? init.substr(0, init.length - 1) : init;
    return wrapInProxy(new UrlBuilder(startingUrl, httpImpl));
}