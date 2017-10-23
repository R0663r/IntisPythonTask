'use strict';

angular.module('signup').component('signup', {
    templateUrl: 'static/js/signup/signup.template.html',
    controller: ['$location', '$scope', 'menu1Service', 'User', function SignupController($location, $scope, menu1Service, User) {
        var self = this;
        var privileges = {
            selectRoles: ['admin'],
            createUser: ['admin']
        };

        self.user = new User();
        self.user.avatar = null;
        self.user.active = false;
        self.user.date_of_birth = {day: 1, month: 1, year: 1900};
        self.user.gender = 'male';

        $scope.isAuthorized = function(func) {
            var userRole = menu1Service.getLoggedUser().role;
            return userRole && privileges[func].includes(userRole);
        };

        self.createUser = function() {
            if(!self.user.role)
                self.user.role = 'user';
            self.user.$save(function(user) {
                if($scope.isAuthorized('createUser')) {
                    $location.url('/signup');
                    self.user = new User();
                }
                else
                    $location.path('/home');
            });
        };
    }]
});
