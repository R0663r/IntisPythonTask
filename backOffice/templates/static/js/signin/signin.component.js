'use strict';

angular.module('signin').component('signin', {
    templateUrl: 'static/js/signin/signin.template.html',
    controller: ['$auth', '$location', 'toaster', 'menu1Service', function signinController($auth, $location, toaster, menu1Service) {
        var self = this;

        var privileges = {
            dashboard: ['admin', 'manager']
        };

        self.signIn = function() {
            self.credentials = {
                email: self.user.email,
                password: self.user.password
            };
            // Use Satellizer's $auth.login method to verify the username and password
            $auth.login(self.credentials).then(function(data) {
                // Set the token received from server
                $auth.setToken(data);
                var user = data.data.user;
                menu1Service.updateLoggedUser(user);
                // If login is successful, redirect to users list
                if(privileges.dashboard.includes(user.role)) {
                    $location.path('/dashboard');
                    menu1Service.updateSelectedTab('dashboard');
                }
                else {
                    $location.path('/profile/' + user.id);
                    menu1Service.updateSelectedTab('myProfile');
                }
            }).catch(function(response) {
                // If login is unsuccessful, display relevant error message.
                toaster.pop({
                    type: 'error',
                    title: 'Login Error',
                    body: response.data,
                    showCloseButton: true,
                    timeout: 0
                });
            });
        }
    }]
});
