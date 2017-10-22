'use strict';

angular.module('core.user').factory('User', ['$resource', function($resource) {
    return $resource('backoffice/api/v1.0/users/:userId', {userId: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}]);