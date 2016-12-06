angular.module('httpfluent', []);

angular.module('httpfluent').service('Httpfluent', function ($http) {

    return function (initUrl) {
        return new ChainableUrl(initUrl, (url, method, body, queryParams, headers)=> {
            let config = {
                url: url,
                method: method,
                data: body,
                params: queryParams,
                headers: headers
            };

            let httpInstance = $http(config);
            return httpInstance;
        });
    }

});