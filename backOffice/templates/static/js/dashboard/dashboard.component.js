'use strict';

angular.module('dashboard').component('dashboard', {
    templateUrl: 'static/js/dashboard/dashboard.template.html',
    controller: ['$auth', '$location', '$scope', 'toaster', 'menu1Service', 'User', function Dashboard($auth, $location, $scope, toaster, menu1Service, User) {
        var self = this;
        self.users = User.query();
        self.orderProp = 'id';

        self.editUser = function(user) {
            menu1Service.updateState('edit');
        };

        self.deleteUser = function(user) {
            user.$delete(function() {
                var index = self.users.indexOf(user);
                self.users.splice(index, 1);
            });
        }
    }]
});