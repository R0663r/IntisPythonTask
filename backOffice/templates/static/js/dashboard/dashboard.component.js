'use strict';

angular.module('dashboard').component('dashboard', {
    templateUrl: 'static/js/dashboard/dashboard.template.html',
    controller: ['$auth', '$location', '$scope', 'toaster', 'menu1Service', 'User', function Dashboard($auth, $location, $scope, toaster, menu1Service, User) {
        var self = this;
        var privileges = {
            delete: ['admin'],
            createUser: ['admin']
        };
        self.users = User.query();
        self.orderProp = 'id';
        self.roleFilter = '';

        self.displayUser = function(state) {
            menu1Service.updateState(state);
        };

        $scope.isAuthorized = function(func) {
            return privileges[func].includes(menu1Service.getLoggedUser().role);
        };

        self.deleteUser = function(user) {
            user.$delete(function() {
                var index = self.users.indexOf(user);
                self.users.splice(index, 1);
            });
        }
    }]
});
