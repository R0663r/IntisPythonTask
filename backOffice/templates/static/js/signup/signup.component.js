'use strict';

angular.module('signup').component('signup', {
    templateUrl: 'static/js/signup/signup.template.html',
    controller: ['$location', 'User', function SignupController($location, User) {
        var self = this;
        self.user = new User();
        self.user.avatar = null;
        self.user.active = false;
        self.user.date_of_birth = {day: 1, month: 1, year: 1900};
        self.createUser = function() {
            self.user.$save(function(user) {
                $location.path('/home');
            });
        };
    }]
});