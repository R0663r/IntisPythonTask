'use strict';

angular.module('backOfficeApp').config(
    ['$locationProvider', '$routeProvider', '$authProvider', function config($locationProvider, $routeProvider, $authProvider) {
        // Satellizer configuration that specifies which API route the JWT should be retrieved from
        $authProvider.loginUrl = '/backoffice/api/v1.0/login';

        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/home', {
            template: '<home></home>'
        }).when('/signIn', {
            template: '<signin></signin>',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        }).when('/signup', {
            template: '<signup></signup>'
        }).when('/dashboard', {
            template: '<dashboard></dashboard>',
            resolve: {
                loginRequired: loginRequired
            }
        }).when('/profile/:userId', {
            template: '<user-profile></user-profile>',
            resolve: {
                loginRequired: loginRequired
            }
        }).
        otherwise('/home');

        //If a user is already logged in, the Login window if requested need not be displayed.
        function skipIfLoggedIn($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        //Redirect unauthenticated users to the login state
        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }

            return deferred.promise;
        }
    }]
);