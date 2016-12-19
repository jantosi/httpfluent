import {ChainableUrl} from '../ChainableUrl';

angular.module('httpfluent', []);

angular.module('httpfluent').service('Httpfluent', function ($http) {

    return function (initUrl) {

        let httpImpl = (url, method, body, queryParams, headers) => {
            let config = {
                url: url,
                method: method,
                data: body,
                params: queryParams,
                headers: headers
            };

            return $http(config);
        };

        return new ChainableUrl(initUrl, httpImpl);
    }

});