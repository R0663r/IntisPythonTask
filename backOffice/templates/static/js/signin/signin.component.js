'use strict';

angular.module('signin').component('signin', {
    templateUrl: 'static/js/signin/signin.template.html',
    controller: ['$auth', '$location', 'toaster', 'menu1Service', function signinController($auth, $location, toaster, menu1Service) {
        var self = this;

        self.signIn = function() {
            self.credentials = {
                email: self.user.email,
                password: self.user.password
            };
            // Use Satellizer's $auth.login method to verify the username and password
            $auth.login(self.credentials).then(function(data) {
                console.log(data.data);
                console.log(data.data.user);
                console.log(data.data.user.id);
                menu1Service.updateLoggedUser(data.data.user);
                // Set the token received from server
                $auth.setToken(data);
                // If login is successful, redirect to users list
				$location.path('/dashboard');
				menu1Service.updateSelectedTab('dashboard');
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
    // controller: ['$scope', 'menu1Service', function signinController($scope, menu1Service) {
    //     $scope.$watch(
    //         menu1Service.getShowMenu1, function(newValue, oldValue) {
    //             $scope.showMenu1 = menu1Service.getShowMenu1();
    //         }
    //     );
    //     $scope.updateShowMenu1 = menu1Service.updateShowMenu1;
    // }]
});