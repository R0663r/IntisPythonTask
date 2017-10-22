'use strict';

angular.module('userProfile').component('userProfile', {
    templateUrl: 'static/js/user-profile/user-profile.template.html',
    controller: ['$routeParams', '$scope', 'menu1Service', 'User', function UserProfileController($routeParams, $scope, menu1Service, User) {
        var self = this;

        $scope.$watch(
            menu1Service.getState, function(newValue, oldValue) {
                $scope.state = menu1Service.getState();
            }
        );
        $scope.updateState = menu1Service.updateState;

        self.user = User.get({userId: $routeParams.userId}, function(user) {
            $scope.updateState('show');
        });

        self.editUser = function() {
            $scope.updateState('edit');
        };

        self.updateUser = function() {
            self.user.$update(function(user) {
                $scope.updateState('show');
            });
        };
    }]
});